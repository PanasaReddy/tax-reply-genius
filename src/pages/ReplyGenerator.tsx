import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Scale,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleNotice = `
NOTICE UNDER SECTION 143(2) OF THE INCOME-TAX ACT, 1961

To: [Taxpayer Name]
PAN: ABCDE1234F
Assessment Year: 2023-24

This is to inform you that your return of income for Assessment Year 2023-24 has been selected for scrutiny assessment under section 143(2) of the Income-tax Act, 1961.

You are hereby required to attend this office on 15th February 2026 at 11:00 AM or cause to be produced any evidence on which you may rely in support of the return.

Issues for Verification:
1. Mismatch between income declared and TDS as per Form 26AS
2. Large cash deposits during the year
3. Discrepancy in capital gains computation

Please bring the following documents:
- Bank statements for all accounts
- Source of cash deposits
- Capital gains workings with supporting documents

Sd/-
Assistant Commissioner of Income Tax
Circle 2(1), Mumbai
`;

const sampleReply = `
To,
The Assistant Commissioner of Income Tax,
Circle 2(1), Mumbai

Subject: Reply to Notice u/s 143(2) for AY 2023-24
Reference: Notice No. [XXX] dated [Date]
PAN: ABCDE1234F

Respected Sir/Madam,

With reference to the above-mentioned notice, I hereby submit my response to the issues raised for verification:

1. **Mismatch between income declared and TDS as per Form 26AS:**

   Upon careful examination of Form 26AS and the income declared in the return, we wish to clarify that the apparent mismatch is due to:
   
   a) TDS credit of ₹25,000 pertaining to FY 2022-23 (AY 2023-24) was reflected in Form 26AS of FY 2023-24 (AY 2024-25) due to delayed TDS filing by the deductor.
   
   b) We are enclosing the TDS certificates (Form 16A) from the concerned deductors confirming the deduction was made during FY 2022-23.

2. **Large cash deposits during the year:**

   The cash deposits aggregating ₹8,50,000 during the year represent:
   
   a) Cash withdrawals from savings bank account redeposited: ₹3,50,000 (Bank statement enclosed)
   b) Cash received from sale of agricultural produce: ₹5,00,000 (Agricultural income declaration enclosed)
   
   All transactions are duly accounted for in the books of accounts and bank statements.

3. **Discrepancy in capital gains computation:**

   The capital gains have been computed correctly as per the provisions of the Income Tax Act, 2025. The detailed computation along with the following documents is enclosed:
   
   a) Purchase and sale deeds of the property
   b) Cost of improvement with supporting bills
   c) Indexed cost computation as per CII notifications
   d) Bank statements showing receipt of sale consideration

**Documents Enclosed:**
1. Form 26AS for AY 2023-24
2. TDS Certificates (Form 16A)
3. Bank statements for all accounts
4. Agricultural income certificate from Tehsildar
5. Property sale and purchase documents
6. Capital gains computation sheet

We trust the above clarifications adequately address the issues raised. We remain available for any further information or clarification as may be required.

Thanking you,

Yours faithfully,

[Taxpayer Name]
[Address]
Date: [Current Date]
Place: Mumbai

Verification:
I, [Taxpayer Name], son/daughter of [Father's Name], do hereby verify that the contents of this reply are true to the best of my knowledge and belief.
`;

export default function ReplyGenerator() {
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("detailed");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [replyContent, setReplyContent] = useState(sampleReply);

  const complianceChecks = [
    { label: "Reference details included", status: true },
    { label: "All issues addressed", status: true },
    { label: "Legal citations present", status: true },
    { label: "Supporting documents listed", status: true },
    { label: "Verification clause added", status: true },
    { label: "Proper formatting", status: true },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(replyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <Layout
      title="Reply Generator"
      subtitle="Generate AI-powered professional replies to tax notices"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Panel - Original Notice */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  Original Notice
                </CardTitle>
                <Badge variant="secondary">Section 143(2)</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] overflow-auto p-4 scrollbar-thin">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                  {sampleNotice}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Generated Reply */}
        <div className="lg:col-span-7 space-y-4">
          {/* Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tone:
                  </span>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="concise">Concise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Length:
                  </span>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brief">Brief</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="comprehensive">
                        Comprehensive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reply Editor */}
          <Tabs defaultValue="edit" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit Reply</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[500px] resize-none border-0 rounded-xl p-4 focus-visible:ring-0"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                      {replyContent}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Compliance Checklist */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Scale className="h-5 w-5 text-primary" />
                Compliance Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {complianceChecks.map((check, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    {check.status ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-danger" />
                    )}
                    <span
                      className={cn(
                        check.status
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg" className="flex-1">
              <Download className="h-4 w-4" />
              Export as PDF
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <Download className="h-4 w-4" />
              Export as DOCX
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
