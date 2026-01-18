import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are an expert in Indian tax law with deep knowledge of:
- Income Tax Act 2025 (536 sections, 23 chapters, effective April 2026)
- GST Act 2017 (CGST/IGST/SGST with all amendments up to January 2026)

Analyze the provided tax notice and extract the following information in JSON format:

{
  "noticeType": "The type of notice (e.g., Scrutiny Assessment, Demand Notice, Show Cause Notice, Intimation, etc.)",
  "section": "The specific section cited (e.g., Section 143(2), Section 73, Section 148A)",
  "issuingAuthority": "The authority/officer issuing the notice with designation and location",
  "assessmentYear": "The assessment year or tax period mentioned (e.g., 2023-24, April 2023 - March 2024)",
  "issues": ["Array of specific issues or discrepancies raised in the notice"],
  "deadline": "The deadline for reply in YYYY-MM-DD format, or calculate based on notice date and standard timelines",
  "requiredDocuments": ["Array of documents that should be submitted in response"],
  "urgency": "low, medium, or high based on deadline proximity and notice severity",
  "summary": "A brief 2-3 sentence summary of the notice",
  "legalReferences": ["Array of relevant legal sections and provisions applicable"],
  "penaltyRisk": "Potential penalty or consequence if not responded properly"
}

Important guidelines:
1. For Income Tax notices, consider sections like 139(9), 143(1), 143(2), 148, 148A, 142(1), etc.
2. For GST notices, consider sections like 73, 74, 61, 65, 66, etc.
3. Calculate deadlines based on:
   - Section 143(2): 30 days from date of service
   - Section 148A: 7-30 days as specified
   - GST Section 73: 30 days from date of notice
   - GST Section 74: 30 days from date of notice
4. If exact deadline is not mentioned, estimate based on standard timelines
5. Always prioritize accuracy of section citations
6. Return ONLY valid JSON, no markdown or additional text`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { noticeText, noticeType, noticeDate } = await req.json();

    if (!noticeText) {
      return new Response(
        JSON.stringify({ success: false, error: "Notice text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userPrompt = `Analyze this ${noticeType || "tax"} notice:

Notice Date: ${noticeDate || "Not specified"}

Notice Content:
${noticeText}

Extract all key information and return as JSON.`;

    console.log("Analyzing notice with AI...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: false, error: "Failed to analyze notice" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ success: false, error: "No analysis generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON response from AI
    let analysisResult;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", content);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to parse analysis results" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Notice analyzed successfully");

    return new Response(
      JSON.stringify({ success: true, data: analysisResult }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error analyzing notice:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
