import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AnalysisPlaceholderProps {
  isLoading?: boolean;
}

export function AnalysisPlaceholder({ isLoading = false }: AnalysisPlaceholderProps) {
  return (
    <Card className="flex h-full min-h-[400px] items-center justify-center">
      <CardContent className="text-center">
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl ${
            isLoading
              ? "gradient-primary animate-pulse-glow"
              : "bg-muted"
          }`}
        >
          <Sparkles
            className={`h-8 w-8 ${
              isLoading ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          />
        </div>
        <h3 className="font-semibold text-foreground">
          {isLoading ? "Analyzing Notice..." : "No Analysis Yet"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {isLoading
            ? "Our AI is extracting key information from your notice"
            : "Upload a notice or paste content to get AI-powered analysis"}
        </p>
      </CardContent>
    </Card>
  );
}
