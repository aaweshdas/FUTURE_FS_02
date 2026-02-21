import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Users, Columns3, Bell, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Smart Lead Management",
    description: "Track every lead from first contact to close. Never let an opportunity slip through the cracks.",
  },
  {
    icon: Columns3,
    title: "Visual Pipeline",
    description: "Drag-and-drop kanban board to visualize your sales pipeline and move deals forward.",
  },
  {
    icon: Bell,
    title: "Follow-up Reminders",
    description: "Never miss a follow-up. Set reminders and stay on top of every relationship.",
  },
];

const steps = [
  { num: "1", title: "Add your leads", desc: "Import or manually add leads with all their contact details." },
  { num: "2", title: "Track & engage", desc: "Move leads through your pipeline and log notes for every interaction." },
  { num: "3", title: "Close & convert", desc: "Set follow-ups, track conversions, and grow your business." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-background" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-36 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Zap className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold">LeadFlow</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Your leads,{" "}
            <span className="text-primary">organized</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A modern CRM built for speed. Track leads, manage your pipeline, and never miss a follow-up — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/register">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {s.num}
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">LeadFlow</span>
        </div>
        © {new Date().getFullYear()} LeadFlow. All rights reserved.
      </footer>
    </div>
  );
}
