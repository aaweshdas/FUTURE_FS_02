import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/Client/contexts/AuthContext";
import { useTheme } from "@/Client/hooks/useTheme";
import {
  LayoutDashboard,
  Users,
  Columns3,
  Bell,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/Frontend/components/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/pipeline", label: "Pipeline", icon: Columns3 },
  { to: "/follow-ups", label: "Follow-ups", icon: Bell },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-7 w-7 text-sidebar-primary" />
            <span className="text-xl font-bold text-sidebar-foreground">LeadFlow</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.to)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <p className="text-xs text-sidebar-muted-foreground truncate">{user?.email}</p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="h-8 w-8 text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold">LeadFlow</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut} className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {mobileOpen && (
          <nav className="md:hidden border-b border-border bg-card p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
