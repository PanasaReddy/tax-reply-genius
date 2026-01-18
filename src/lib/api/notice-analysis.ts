import { supabase } from "@/integrations/supabase/client";

export interface AnalysisResult {
  noticeType: string;
  section: string;
  issuingAuthority: string;
  assessmentYear: string;
  issues: string[];
  deadline: string;
  requiredDocuments: string[];
  urgency: "low" | "medium" | "high";
  summary?: string;
  legalReferences?: string[];
  penaltyRisk?: string;
}

interface AnalyzeNoticeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export async function analyzeNotice(
  noticeText: string,
  noticeType: string,
  noticeDate?: string
): Promise<AnalyzeNoticeResponse> {
  const { data, error } = await supabase.functions.invoke("analyze-notice", {
    body: { noticeText, noticeType, noticeDate },
  });

  if (error) {
    console.error("Error calling analyze-notice function:", error);
    return { success: false, error: error.message };
  }

  return data;
}

export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (file.type === "text/plain") {
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      // For PDFs, we'll read as text (basic extraction)
      // In production, you'd use a proper PDF parser
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        // Basic text extraction - in production use pdf.js or similar
        resolve(`[PDF Content from: ${file.name}]\n\nPlease paste the text content of this PDF for accurate analysis.`);
      };
      reader.onerror = () => reject(new Error("Failed to read PDF"));
      reader.readAsText(file);
    } else if (file.type.includes("image")) {
      // For images, we'll return a message asking for manual input
      // In production, you'd integrate OCR service
      resolve(`[Image file: ${file.name}]\n\nImage OCR is processing. For best results, please also paste the notice text manually.`);
    } else {
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    }
  });
}

export function formatDeadline(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function calculateDaysRemaining(deadline: string): number {
  try {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 30; // Default to 30 days if parsing fails
  }
}
