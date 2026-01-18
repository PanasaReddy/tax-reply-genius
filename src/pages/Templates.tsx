import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, FileText, ArrowRight, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  title: string;
  section: string;
  description: string;
  type: "income-tax" | "gst";
  popular?: boolean;
  preview: string;
}

const templates: Template[] = [
  {
    id: "1",
    title: "Defective Return Response",
    section: "Section 139(9)",
    description:
      "Response template for defective return notice with rectification details",
    type: "income-tax",
    popular: true,
    preview:
      "Subject: Response to Notice u/s 139(9) - Defective Return\n\nRespected Sir/Madam,\n\nWith reference to the notice dated [Date] regarding defective return for AY [Year], I hereby submit the following clarification...",
  },
  {
    id: "2",
    title: "Scrutiny Assessment Reply",
    section: "Section 143(2)",
    description:
      "Comprehensive reply template for scrutiny assessment with document checklist",
    type: "income-tax",
    popular: true,
    preview:
      "Subject: Reply to Notice u/s 143(2) for AY [Year]\n\nRespected Sir/Madam,\n\nIn response to the above-mentioned notice, I submit the following point-wise clarifications...",
  },
  {
    id: "3",
    title: "Reassessment Response",
    section: "Section 148A",
    description:
      "Template for responding to reassessment proceedings under Section 148A",
    type: "income-tax",
    preview:
      "Subject: Response to Notice u/s 148A - Show Cause\n\nRespected Sir/Madam,\n\nI have received your notice dated [Date] under Section 148A proposing to reopen the assessment...",
  },
  {
    id: "4",
    title: "Information Request Reply",
    section: "Section 142(1)",
    description: "Reply template for information request notices",
    type: "income-tax",
    preview:
      "Subject: Submission of Information u/s 142(1)\n\nRespected Sir/Madam,\n\nIn compliance with your notice dated [Date], I hereby submit the requisite information...",
  },
  {
    id: "5",
    title: "GST Demand Notice Response",
    section: "Section 73",
    description:
      "Response template for GST demand notices under Section 73 (non-fraud cases)",
    type: "gst",
    popular: true,
    preview:
      "Subject: Reply to Show Cause Notice u/s 73 of CGST Act\n\nRespected Sir/Madam,\n\nIn response to the Show Cause Notice dated [Date], we submit our detailed reply...",
  },
  {
    id: "6",
    title: "ITC Mismatch Clarification",
    section: "GSTR-3B vs GSTR-2B",
    description:
      "Template for clarifying ITC discrepancies between GSTR-3B and GSTR-2B",
    type: "gst",
    popular: true,
    preview:
      "Subject: Clarification on ITC Mismatch - GSTR-3B vs GSTR-2B\n\nRespected Sir/Madam,\n\nWe wish to clarify the ITC discrepancy as follows...",
  },
  {
    id: "7",
    title: "GST Fraud Investigation Response",
    section: "Section 74",
    description: "Detailed response template for Section 74 fraud allegations",
    type: "gst",
    preview:
      "Subject: Reply to Show Cause Notice u/s 74 of CGST Act\n\nRespected Sir/Madam,\n\nWe strongly deny the allegations of fraud or wilful misstatement...",
  },
  {
    id: "8",
    title: "GSTR-1 vs GSTR-3B Reconciliation",
    section: "GST Returns",
    description: "Template for explaining GSTR-1 and GSTR-3B mismatches",
    type: "gst",
    preview:
      "Subject: Reconciliation of GSTR-1 and GSTR-3B for [Period]\n\nRespected Sir/Madam,\n\nWe provide the detailed reconciliation statement...",
  },
];

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const incomeTaxTemplates = filteredTemplates.filter(
    (t) => t.type === "income-tax"
  );
  const gstTemplates = filteredTemplates.filter((t) => t.type === "gst");

  return (
    <Layout
      title="Templates Library"
      subtitle="Pre-built templates for common tax notice responses"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Templates Grid */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="income-tax">Income Tax</TabsTrigger>
            <TabsTrigger value="gst">GST</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredTemplates.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => setSelectedTemplate(template)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="income-tax" className="space-y-6">
            {incomeTaxTemplates.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {incomeTaxTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => setSelectedTemplate(template)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="gst" className="space-y-6">
            {gstTemplates.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gstTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => setSelectedTemplate(template)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Template Preview Modal */}
      <Dialog
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplate(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedTemplate?.title}</h3>
                <p className="text-sm text-muted-foreground font-normal">
                  {selectedTemplate?.section}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto mt-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
                {selectedTemplate?.preview}
              </pre>
            </div>
          </div>
          <div className="flex gap-3 mt-4 pt-4 border-t border-border">
            <Button variant="gradient" className="flex-1">
              Use Template
            </Button>
            <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

function TemplateCard({
  template,
  onClick,
  style,
}: {
  template: Template;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 animate-fade-in"
      onClick={onClick}
      style={style}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:gradient-primary group-hover:text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          {template.popular && (
            <Badge className="bg-secondary/10 text-secondary border-secondary/30">
              <Star className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-base mt-3">{template.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              template.type === "income-tax"
                ? "border-primary/30 text-primary"
                : "border-secondary/30 text-secondary"
            )}
          >
            {template.type === "income-tax" ? "Income Tax" : "GST"}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {template.section}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-primary font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View Template
          <ArrowRight className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="flex items-center justify-center p-12">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground">No templates found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search query
        </p>
      </div>
    </Card>
  );
}
