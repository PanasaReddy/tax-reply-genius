import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileUploader } from "@/components/analyze/FileUploader";
import { AnalysisResults } from "@/components/analyze/AnalysisResults";
import { AnalysisForm } from "@/components/analyze/AnalysisForm";
import { AnalysisPlaceholder } from "@/components/analyze/AnalysisPlaceholder";
import { analyzeNotice, extractTextFromFile, type AnalysisResult } from "@/lib/api/notice-analysis";
import { useToast } from "@/hooks/use-toast";

export default function NoticeAnalysis() {
  const [files, setFiles] = useState<File[]>([]);
  const [manualText, setManualText] = useState("");
  const [noticeType, setNoticeType] = useState<string>("");
  const [noticeDate, setNoticeDate] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Extract text from files if uploaded
      let noticeText = manualText;
      
      if (files.length > 0 && !manualText) {
        const extractedTexts = await Promise.all(
          files.map((file) => extractTextFromFile(file))
        );
        noticeText = extractedTexts.join("\n\n");
      }

      if (!noticeText.trim()) {
        toast({
          title: "No content to analyze",
          description: "Please upload a file or paste notice content",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      const response = await analyzeNotice(noticeText, noticeType, noticeDate);

      if (response.success && response.data) {
        setAnalysisResult(response.data);
        toast({
          title: "Analysis Complete",
          description: "Notice has been analyzed successfully",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: response.error || "Failed to analyze notice",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = (files.length > 0 || manualText.trim().length > 0) && noticeType.length > 0;

  return (
    <Layout
      title="Notice Analysis"
      subtitle="Upload or paste a tax notice to get AI-powered analysis"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <AnalysisForm
          files={files}
          onFilesChange={setFiles}
          manualText={manualText}
          onManualTextChange={setManualText}
          noticeType={noticeType}
          onNoticeTypeChange={setNoticeType}
          noticeDate={noticeDate}
          onNoticeDateChange={setNoticeDate}
          isAnalyzing={isAnalyzing}
          canAnalyze={canAnalyze}
          onAnalyze={handleAnalyze}
        />

        {/* Analysis Results */}
        <div className="space-y-6">
          {!analysisResult && !isAnalyzing && <AnalysisPlaceholder />}
          {isAnalyzing && <AnalysisPlaceholder isLoading={true} />}
          {analysisResult && !isAnalyzing && (
            <AnalysisResults result={analysisResult} />
          )}
        </div>
      </div>
    </Layout>
  );
}
