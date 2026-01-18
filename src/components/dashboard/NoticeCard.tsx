import { cn } from "@/lib/utils";
import { Clock, ArrowRight, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface NoticeCardProps {
  id: string;
  type: "income-tax" | "gst";
  section: string;
  title: string;
  deadline: Date;
  status: "pending" | "in-progress" | "completed";
  assessmentYear?: string;
}

export function NoticeCard({
  id,
  type,
  section,
  title,
  deadline,
  status,
  assessmentYear,
}: NoticeCardProps) {
  const daysLeft = Math.ceil(
    (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const getUrgencyColor = () => {
    if (daysLeft < 0) return "danger";
    if (daysLeft <= 7) return "danger";
    if (daysLeft <= 15) return "warning";
    return "success";
  };

  const urgency = getUrgencyColor();

  const statusStyles = {
    pending: "bg-muted text-muted-foreground",
    "in-progress": "bg-primary/10 text-primary",
    completed: "bg-success/10 text-success",
  };

  const urgencyStyles = {
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    danger: "border-danger/30 bg-danger/5",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border-2 bg-card p-5 transition-all duration-300 hover:shadow-lg",
        urgencyStyles[urgency]
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-semibold uppercase",
                type === "income-tax"
                  ? "border-primary/30 text-primary"
                  : "border-secondary/30 text-secondary"
              )}
            >
              {type === "income-tax" ? "Income Tax" : "GST"}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {section}
            </Badge>
            <Badge className={cn("text-xs", statusStyles[status])}>
              {status.replace("-", " ")}
            </Badge>
          </div>

          <h3 className="font-semibold text-card-foreground line-clamp-2">
            {title}
          </h3>

          {assessmentYear && (
            <p className="text-sm text-muted-foreground">
              Assessment Year: {assessmentYear}
            </p>
          )}

          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5",
                urgency === "danger"
                  ? "bg-danger/10 text-danger"
                  : urgency === "warning"
                  ? "bg-warning/10 text-warning"
                  : "bg-success/10 text-success"
              )}
            >
              {urgency === "danger" && daysLeft < 0 ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              <span className="text-sm font-semibold">
                {daysLeft < 0
                  ? `Overdue by ${Math.abs(daysLeft)} days`
                  : daysLeft === 0
                  ? "Due Today"
                  : `${daysLeft} days left`}
              </span>
            </div>
          </div>
        </div>

        <Link to={`/reply/${id}`}>
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 shrink-0 rounded-full transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Urgency indicator bar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-full",
          urgency === "danger"
            ? "bg-danger"
            : urgency === "warning"
            ? "bg-warning"
            : "bg-success"
        )}
      />
    </div>
  );
}
