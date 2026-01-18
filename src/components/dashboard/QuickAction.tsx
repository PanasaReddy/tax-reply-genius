import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

export function QuickAction({
  title,
  description,
  icon: Icon,
  href,
  variant = "outline",
}: QuickActionProps) {
  const variants = {
    primary:
      "gradient-primary text-primary-foreground hover:shadow-glow",
    secondary:
      "gradient-secondary text-secondary-foreground",
    outline:
      "border-2 border-dashed border-border bg-card hover:border-primary hover:bg-accent",
  };

  return (
    <Link
      to={href}
      className={cn(
        "group flex flex-col items-center justify-center gap-3 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02]",
        variants[variant]
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          variant === "outline"
            ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            : "bg-white/20"
        )}
      >
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <h3
          className={cn(
            "font-semibold",
            variant === "outline" ? "text-card-foreground" : ""
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm",
            variant === "outline"
              ? "text-muted-foreground"
              : "text-white/80"
          )}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
