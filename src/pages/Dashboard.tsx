import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { NoticeCard } from "@/components/dashboard/NoticeCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { QuickAction } from "@/components/dashboard/QuickAction";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  MessageSquareReply,
  BookOpen,
  Calculator,
  FileCheck,
  Send,
  Edit,
} from "lucide-react";

// Sample data
const notices = [
  {
    id: "1",
    type: "income-tax" as const,
    section: "Section 143(2)",
    title: "Scrutiny Assessment Notice for AY 2023-24",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: "pending" as const,
    assessmentYear: "2023-24",
  },
  {
    id: "2",
    type: "gst" as const,
    section: "Section 73",
    title: "GST Demand Notice - ITC Mismatch",
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    status: "in-progress" as const,
    assessmentYear: "FY 2022-23",
  },
  {
    id: "3",
    type: "income-tax" as const,
    section: "Section 139(9)",
    title: "Defective Return Notice",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: "pending" as const,
    assessmentYear: "2024-25",
  },
];

const recentActivity = [
  {
    icon: FileCheck,
    title: "Reply Submitted",
    description: "Section 142(1) notice reply for Client ABC",
    time: "2 hours ago",
    variant: "success" as const,
  },
  {
    icon: Edit,
    title: "Draft Saved",
    description: "GST Section 73 reply in progress",
    time: "5 hours ago",
    variant: "primary" as const,
  },
  {
    icon: Upload,
    title: "Notice Uploaded",
    description: "New Section 143(2) scrutiny notice",
    time: "1 day ago",
    variant: "warning" as const,
  },
  {
    icon: Send,
    title: "Reply Generated",
    description: "AI generated reply for defective return",
    time: "2 days ago",
    variant: "primary" as const,
  },
];

export default function Dashboard() {
  return (
    <Layout
      title="Dashboard"
      subtitle="Welcome back! Here's an overview of your tax notices."
    >
      <div className="space-y-8">
        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Notices"
            value={12}
            description="Requiring attention"
            icon={FileText}
            variant="primary"
            trend={{ value: 8, isPositive: false }}
          />
          <StatCard
            title="Pending Replies"
            value={5}
            description="Draft or awaiting review"
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Completed"
            value={47}
            description="This month"
            icon={CheckCircle2}
            variant="success"
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Urgent"
            value={3}
            description="Due within 7 days"
            icon={AlertTriangle}
            variant="danger"
          />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              title="Upload Notice"
              description="Analyze new tax notice"
              icon={Upload}
              href="/analyze"
              variant="primary"
            />
            <QuickAction
              title="Generate Reply"
              description="AI-powered responses"
              icon={MessageSquareReply}
              href="/reply"
              variant="secondary"
            />
            <QuickAction
              title="Knowledge Base"
              description="Tax laws & procedures"
              icon={BookOpen}
              href="/knowledge"
            />
            <QuickAction
              title="Calculators"
              description="Tax computations"
              icon={Calculator}
              href="/calculators"
            />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Urgent Notices */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Urgent Notices
              </h2>
              <a
                href="/notices"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all →
              </a>
            </div>
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <div
                  key={notice.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <NoticeCard {...notice} />
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
            <div className="rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="animate-slide-in-right"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ActivityItem {...activity} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Disclaimer */}
        <section className="rounded-xl border border-border bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> This tool provides AI-assisted drafting
            only. Always review content carefully and consult qualified tax
            professionals for complex cases. Not a substitute for professional
            tax advice.
          </p>
        </section>
      </div>
    </Layout>
  );
}
