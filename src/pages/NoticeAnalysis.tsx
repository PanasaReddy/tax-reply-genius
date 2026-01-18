import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileUploader } from "@/components/analyze/FileUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  noticeType: string;
  section: string;
  issuingAuthority: string;
  assessmentYear: string;
  issues: string[];
  deadline: string;
  requiredDocuments: string[];
  urgency: "low" | "medium" | "high";
}

export default function NoticeAnalysis() {
  const [files, setFiles] = useState<File[]>([]);
  const [manualText, setManualText] = useState("");
  const [noticeType, setNoticeType] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    setAnalysisResult({
      noticeType: noticeType === "income-tax" ? "Scrutiny Assessment" : "GST Demand Notice",
      section: noticeType === "income-tax" ? "Section 143(2)" : "Section 73",
      issuingAuthority: noticeType === "income-tax" 
        ? "Assistant Commissioner of Income Tax, Circle 2(1), Mumbai"
        : "Assistant Commissioner of CGST, Division IV, Mumbai",
      assessmentYear: "2023-24",
      issues: [
        "Mismatch in income declared vs TDS credited",
        "Unexplained cash deposits during the year",
        "Discrepancy in capital gains computation",
      ],
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      requiredDocuments: [
        "Bank statements for all accounts",
        "Form 26AS reconciliation",
        "Capital gains computation workings",
        "Source of funds for cash deposits",
      ],
      urgency: "high",
    });
    setIsAnalyzing(false);
  };

  const urgencyColors = {
    low: "bg-success/10 text-success border-success/30",
    medium: "bg-warning/10 text-warning border-warning/30",
    high: "bg-danger/10 text-danger border-danger/30",
  };

  return (
    <Layout
      title="Notice Analysis"
      subtitle="Upload or paste a tax notice to get AI-powered analysis"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Upload Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUploader onFileSelect={setFiles} />

              <div className="relative flex items-center">
                <div className="flex-1 border-t border-border" />
                <span className="mx-4 text-xs text-muted-foreground uppercase">
                  or
                </span>
                <div className="flex-1 border-t border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manualText">Paste Notice Content</Label>
                <Textarea
                  id="manualText"
                  placeholder="Paste the notice content here..."
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Notice Type</Label>
                  <Select value={noticeType} onValueChange={setNoticeType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income-tax">Income Tax</SelectItem>
                      <SelectItem value="gst">GST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notice Date</Label>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <Button
                variant="gradient"
                className="w-full"
                size="lg"
                onClick={handleAnalyze}
                disabled={(!files.length && !manualText) || !noticeType || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Notice...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {!analysisResult && !isAnalyzing && (
            <Card className="flex h-full min-h-[400px] items-center justify-center">
              <CardContent className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">
                  No Analysis Yet
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload a notice or paste content to get AI-powered analysis
                </p>
              </CardContent>
            </Card>
          )}

          {isAnalyzing && (
            <Card className="flex h-full min-h-[400px] items-center justify-center">
              <CardContent className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl gradient-primary animate-pulse-glow">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">
                  Analyzing Notice...
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our AI is extracting key information from your notice
                </p>
              </CardContent>
            </Card>
          )}

          {analysisResult && !isAnalyzing && (
            <div className="space-y-4 animate-fade-in">
              {/* Urgency Alert */}
              <Card
                className={cn(
                  "border-2",
                  urgencyColors[analysisResult.urgency]
                )}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <AlertCircle className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="font-semibold">
                      {analysisResult.urgency === "high"
                        ? "Urgent Attention Required"
                        : analysisResult.urgency === "medium"
                        ? "Action Required Soon"
                        : "Standard Response Time"}
                    </p>
                    <p className="text-sm opacity-80">
                      Deadline: {analysisResult.deadline}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Notice Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notice Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Notice Type
                      </p>
                      <p className="font-semibold">
                        {analysisResult.noticeType}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Section
                      </p>
                      <Badge variant="secondary">{analysisResult.section}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Assessment Year
                      </p>
                      <p className="font-semibold">
                        {analysisResult.assessmentYear}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Reply Deadline
                      </p>
                      <div className="flex items-center gap-2 text-danger font-semibold">
                        <Clock className="h-4 w-4" />
                        {analysisResult.deadline}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Issuing Authority
                    </p>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{analysisResult.issuingAuthority}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issues Raised */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Issues Raised</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger/10 text-xs font-bold text-danger">
                          {index + 1}
                        </span>
                        <span className="text-sm">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Required Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        <span className="text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button variant="gradient" size="lg" className="w-full">
                Generate Reply
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
