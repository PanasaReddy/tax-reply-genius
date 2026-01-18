import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileSearch, MessageSquareReply, FileText, BookOpen, Calculator, Settings, HelpCircle, Scale } from "lucide-react";
const navigation = [{
  name: "Dashboard",
  href: "/",
  icon: LayoutDashboard
}, {
  name: "Analyze Notice",
  href: "/analyze",
  icon: FileSearch
}, {
  name: "Reply Generator",
  href: "/reply",
  icon: MessageSquareReply
}, {
  name: "Templates",
  href: "/templates",
  icon: FileText
}, {
  name: "Knowledge Base",
  href: "/knowledge",
  icon: BookOpen
}, {
  name: "Calculators",
  href: "/calculators",
  icon: Calculator
}];
const bottomNavigation = [{
  name: "Settings",
  href: "/settings",
  icon: Settings
}, {
  name: "Help",
  href: "/help",
  icon: HelpCircle
}];
export function Sidebar() {
  const location = useLocation();
  return <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Scale className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">TaxWale</span>
            <span className="text-xs text-sidebar-foreground/60">Reply Assistant</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
            Main Menu
          </div>
          {navigation.map(item => {
          const isActive = location.pathname === item.href;
          return <Link key={item.name} to={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200", isActive ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground")}>Tax Calculators<item.icon className="h-5 w-5" />
                {item.name}
              </Link>;
        })}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-sidebar-border px-3 py-4">
          {bottomNavigation.map(item => <Link key={item.name} to={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground">
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>)}
        </div>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Panasa Reddy</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">CMA</p>
            </div>
          </div>
        </div>
      </div>
    </aside>;
}