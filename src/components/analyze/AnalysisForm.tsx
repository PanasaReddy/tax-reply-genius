import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { FileText, Sparkles, Loader2 } from "lucide-react";
import { FileUploader } from "./FileUploader";

interface AnalysisFormProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  manualText: string;
  onManualTextChange: (text: string) => void;
  noticeType: string;
  onNoticeTypeChange: (type: string) => void;
  noticeDate: string;
  onNoticeDateChange: (date: string) => void;
  isAnalyzing: boolean;
  canAnalyze: boolean;
  onAnalyze: () => void;
}

export function AnalysisForm({
  files,
  onFilesChange,
  manualText,
  onManualTextChange,
  noticeType,
  onNoticeTypeChange,
  noticeDate,
  onNoticeDateChange,
  isAnalyzing,
  canAnalyze,
  onAnalyze,
}: AnalysisFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Upload Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUploader onFileSelect={onFilesChange} />

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
              placeholder="Paste the notice content here for AI analysis..."
              value={manualText}
              onChange={(e) => onManualTextChange(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              For best results, paste the complete notice text including reference numbers, dates, and all paragraphs.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Notice Type</Label>
              <Select value={noticeType} onValueChange={onNoticeTypeChange}>
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
                value={noticeDate}
                onChange={(e) => onNoticeDateChange(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <Button
            variant="gradient"
            className="w-full"
            size="lg"
            onClick={onAnalyze}
            disabled={!canAnalyze || isAnalyzing}
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
  );
}
