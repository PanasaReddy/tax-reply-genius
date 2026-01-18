import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  BookOpen,
  Scale,
  Clock,
  ExternalLink,
  Bell,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const incomeTaxSections = [
  {
    section: "Section 139(9)",
    title: "Defective Return",
    timeline: "15 days",
    description:
      "Notice for defective return of income. Must respond within 15 days with rectified return.",
    keyPoints: [
      "Filed when return has computational errors",
      "Response requires correcting defects within 15 days",
      "File Form 35 with rectified return",
      "Non-compliance treats return as invalid",
    ],
  },
  {
    section: "Section 143(1)",
    title: "Intimation",
    timeline: "30 days",
    description:
      "Intimation regarding processing of return with adjustments made by CPC.",
    keyPoints: [
      "Automatic processing by CPC",
      "Shows adjustments made to return",
      "30 days for rectification request",
      "Accept or dispute adjustments",
    ],
  },
  {
    section: "Section 143(2)",
    title: "Scrutiny Notice",
    timeline: "30 days",
    description:
      "Notice for detailed scrutiny of return filed by assessee.",
    keyPoints: [
      "Return selected for detailed verification",
      "Must provide all supporting documents",
      "Personal hearing may be required",
      "Comprehensive response needed",
    ],
  },
  {
    section: "Section 148/148A",
    title: "Reassessment",
    timeline: "30 days (148A)",
    description:
      "Notice for reopening assessment when income has escaped assessment.",
    keyPoints: [
      "Section 148A requires show cause before 148",
      "30 days to respond to show cause",
      "Must prove proper disclosure was made",
      "Strong legal representation recommended",
    ],
  },
  {
    section: "Section 142(1)",
    title: "Information Request",
    timeline: "As specified",
    description:
      "Notice requiring specific information or documents from assessee.",
    keyPoints: [
      "Request for specific information/documents",
      "Timeline as specified in notice",
      "Provide complete information",
      "Partial compliance not acceptable",
    ],
  },
];

const gstSections = [
  {
    section: "Section 73",
    title: "Demand Notice (Non-Fraud)",
    timeline: "30/90 days",
    description:
      "Show cause notice for tax not paid, short paid, or erroneously refunded (without fraud).",
    keyPoints: [
      "No allegation of fraud or suppression",
      "Normal period of limitation applies",
      "Point-by-point response required",
      "Settlement options available",
    ],
  },
  {
    section: "Section 74",
    title: "Demand Notice (Fraud)",
    timeline: "30/90 days",
    description:
      "Show cause notice where fraud, suppression, or wilful misstatement is alleged.",
    keyPoints: [
      "Serious allegations of fraud",
      "Extended period of limitation",
      "Higher penalties applicable",
      "Legal representation strongly advised",
    ],
  },
  {
    section: "Section 148A",
    title: "Track & Trace",
    timeline: "As notified",
    description:
      "New provision for tracking goods in evasion-prone commodities.",
    keyPoints: [
      "Applicable to specified commodities",
      "Unique identification for goods",
      "Compliance mandatory from April 2025",
      "Non-compliance attracts penalties",
    ],
  },
  {
    section: "Section 128A",
    title: "Amnesty Scheme",
    timeline: "As notified",
    description:
      "Amnesty scheme for waiver of interest and penalty for FY 2017-20.",
    keyPoints: [
      "Applies to FY 2017-18 to 2019-20",
      "Full waiver of interest and penalty",
      "Only tax amount to be paid",
      "Time-bound scheme",
    ],
  },
];

const recentUpdates = [
  {
    date: "January 2026",
    title: "New Income Tax Act 2025 effective from April 2026",
    description:
      "Simplified tax code with 536 sections replacing the 1961 Act",
    type: "income-tax",
  },
  {
    date: "January 2026",
    title: "GST Track & Trace mechanism operational",
    description:
      "Section 148A implementation for evasion-prone commodities",
    type: "gst",
  },
  {
    date: "December 2025",
    title: "Sequential GSTR-7 filing mandatory",
    description:
      "TDS return filing now requires sequential compliance",
    type: "gst",
  },
  {
    date: "November 2025",
    title: "GSTAT fully operational",
    description:
      "GST Appellate Tribunal operational across all benches",
    type: "gst",
  },
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout
      title="Legal Knowledge Base"
      subtitle="Comprehensive guide to Income Tax Act 2025 and GST Act 2017"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sections, notices, procedures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="income-tax" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="income-tax" className="gap-2">
                  <Scale className="h-4 w-4" />
                  Income Tax Act 2025
                </TabsTrigger>
                <TabsTrigger value="gst" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  GST Act 2017
                </TabsTrigger>
              </TabsList>

              <TabsContent value="income-tax" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Income Tax Act, 2025
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Effective from April 1, 2026 • 536 Sections • 23 Chapters
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {incomeTaxSections.map((item) => (
                        <AccordionItem
                          key={item.section}
                          value={item.section}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-3 text-left">
                              <Badge variant="secondary">{item.section}</Badge>
                              <span className="font-medium">{item.title}</span>
                              <Badge
                                variant="outline"
                                className="ml-auto border-warning/30 text-warning"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {item.timeline}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-2">
                            <p className="text-sm text-muted-foreground mb-4">
                              {item.description}
                            </p>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Key Points:</p>
                              <ul className="space-y-1">
                                {item.keyPoints.map((point, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-sm"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gst" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      GST Act, 2017 (with Amendments)
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      CGST/IGST/SGST Acts with amendments up to January 2026
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {gstSections.map((item) => (
                        <AccordionItem
                          key={item.section}
                          value={item.section}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-3 text-left">
                              <Badge variant="secondary">{item.section}</Badge>
                              <span className="font-medium">{item.title}</span>
                              <Badge
                                variant="outline"
                                className="ml-auto border-warning/30 text-warning"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {item.timeline}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-2">
                            <p className="text-sm text-muted-foreground mb-4">
                              {item.description}
                            </p>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Key Points:</p>
                              <ul className="space-y-1">
                                {item.keyPoints.map((point, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-sm"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Recent Updates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bell className="h-5 w-5 text-primary" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="space-y-1 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          update.type === "income-tax"
                            ? "border-primary/30 text-primary"
                            : "border-secondary/30 text-secondary"
                        )}
                      >
                        {update.type === "income-tax" ? "IT" : "GST"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {update.date}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{update.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {update.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  Official Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "CBDT Notifications", url: "#" },
                  { label: "CBIC Circulars", url: "#" },
                  { label: "Income Tax Portal", url: "#" },
                  { label: "GST Portal", url: "#" },
                  { label: "GSTAT Website", url: "#" },
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {link.label}
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
