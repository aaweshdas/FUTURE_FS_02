import { useLeads, useFollowUps } from "@/Client/hooks/useLeads";
import { Card, CardContent, CardHeader, CardTitle } from "@/Frontend/components/ui/card";
import { Badge } from "@/Frontend/components/ui/badge";
import { Users, UserPlus, PhoneCall, CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";
import AppLayout from "@/Frontend/components/AppLayout";

const statusColors: Record<string, string> = {
  new: "hsl(239, 84%, 67%)",
  contacted: "hsl(38, 92%, 50%)",
  converted: "hsl(142, 76%, 36%)",
  lost: "hsl(0, 84%, 60%)",
};

const statusBadgeVariant: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-warning/10 text-warning",
  converted: "bg-success/10 text-success",
  lost: "bg-destructive/10 text-destructive",
};

export default function Dashboard() {
  const { data: leads = [] } = useLeads();
  const { data: followUps = [] } = useFollowUps();

  const counts = { new: 0, contacted: 0, converted: 0, lost: 0 };
  leads.forEach((l) => counts[l.status]++);
  const total = leads.length;
  const convRate = total > 0 ? Math.round((counts.converted / total) * 100) : 0;

  const barData = [
    { stage: "New", count: counts.new },
    { stage: "Contacted", count: counts.contacted },
    { stage: "Converted", count: counts.converted },
    { stage: "Lost", count: counts.lost },
  ];

  const pieData = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => ({ name: k, value: v }));

  const recentLeads = leads.slice(0, 5);
  const pendingFollowUps = followUps
    .filter((f: any) => !f.completed)
    .slice(0, 5);

  const statCards = [
    { label: "Total Leads", value: total, icon: Users, color: "text-primary" },
    { label: "New", value: counts.new, icon: UserPlus, color: "text-primary" },
    { label: "Contacted", value: counts.contacted, icon: PhoneCall, color: "text-warning" },
    { label: "Converted", value: counts.converted, icon: CheckCircle2, color: "text-success" },
    { label: "Conv. Rate", value: `${convRate}%`, icon: TrendingUp, color: "text-success" },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {statCards.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Leads by Stage</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="stage" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(239, 84%, 67%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Lead Distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name" label>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={statusColors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Lists */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Recent Leads</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recentLeads.length === 0 && <p className="text-sm text-muted-foreground">No leads yet</p>}
              {recentLeads.map((l) => (
                <div key={l.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.company || "—"}</p>
                  </div>
                  <Badge variant="secondary" className={statusBadgeVariant[l.status]}>
                    {l.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4" /> Upcoming Follow-ups</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {pendingFollowUps.length === 0 && <p className="text-sm text-muted-foreground">No pending follow-ups</p>}
              {pendingFollowUps.map((f: any) => (
                <div key={f.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{f.description}</p>
                    <p className="text-xs text-muted-foreground">{f.leads?.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{format(new Date(f.reminder_at), "MMM d, h:mm a")}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
