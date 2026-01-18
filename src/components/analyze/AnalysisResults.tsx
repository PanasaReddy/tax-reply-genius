import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Building2,
  Scale,
  FileWarning,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type AnalysisResult, formatDeadline, calculateDaysRemaining } from "@/lib/api/notice-analysis";
import { useNavigate } from "react-router-dom";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const navigate = useNavigate();
  const daysRemaining = calculateDaysRemaining(result.deadline);

  const urgencyColors = {
    low: "bg-success/10 text-success border-success/30",
    medium: "bg-warning/10 text-warning border-warning/30",
    high: "bg-danger/10 text-danger border-danger/30",
  };

  const urgencyLabels = {
    low: "Standard Response Time",
    medium: "Action Required Soon",
    high: "Urgent Attention Required",
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Urgency Alert */}
      <Card className={cn("border-2", urgencyColors[result.urgency])}>
        <CardContent className="flex items-center gap-4 p-4">
          <AlertCircle className="h-6 w-6 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">{urgencyLabels[result.urgency]}</p>
            <p className="text-sm opacity-80">
              Deadline: {formatDeadline(result.deadline)}
              {daysRemaining > 0 && ` (${daysRemaining} days remaining)`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {result.summary && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
          </CardContent>
        </Card>
      )}

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
              <p className="font-semibold">{result.noticeType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Section
              </p>
              <Badge variant="secondary">{result.section}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Assessment Year
              </p>
              <p className="font-semibold">{result.assessmentYear}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Reply Deadline
              </p>
              <div className="flex items-center gap-2 text-danger font-semibold">
                <Clock className="h-4 w-4" />
                {formatDeadline(result.deadline)}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Issuing Authority
            </p>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">{result.issuingAuthority}</p>
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
            {result.issues.map((issue, index) => (
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

      {/* Legal References */}
      {result.legalReferences && result.legalReferences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="h-5 w-5 text-primary" />
              Legal References
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.legalReferences.map((ref, index) => (
                <Badge key={index} variant="outline">
                  {ref}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Penalty Risk */}
      {result.penaltyRisk && (
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-warning">
              <FileWarning className="h-5 w-5" />
              Penalty Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{result.penaltyRisk}</p>
          </CardContent>
        </Card>
      )}

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                <span className="text-sm">{doc}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button
        variant="gradient"
        size="lg"
        className="w-full"
        onClick={() => navigate("/reply/new")}
      >
        Generate Reply
      </Button>
    </div>
  );
}
