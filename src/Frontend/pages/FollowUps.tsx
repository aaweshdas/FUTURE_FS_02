import AppLayout from "@/Frontend/components/AppLayout";
import { useFollowUps, useUpdateFollowUp } from "@/Client/hooks/useLeads";
import { Button } from "@/Frontend/components/ui/button";
import { Badge } from "@/Frontend/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Frontend/components/ui/card";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { CheckCircle2, Undo2, Clock } from "lucide-react";

function timeBadge(date: string) {
  const d = new Date(date);
  if (isPast(d) && !isToday(d)) return <Badge variant="destructive" className="text-xs">Overdue</Badge>;
  if (isToday(d)) return <Badge className="bg-warning/10 text-warning text-xs">Today</Badge>;
  if (isTomorrow(d)) return <Badge className="bg-info/10 text-info text-xs">Tomorrow</Badge>;
  return null;
}

export default function FollowUpsPage() {
  const { data: followUps = [] } = useFollowUps();
  const updateFollowUp = useUpdateFollowUp();

  const pending = followUps.filter((f: any) => !f.completed);
  const completed = followUps.filter((f: any) => f.completed);

  return (
    <AppLayout>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Follow-ups</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Pending ({pending.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pending.length === 0 && <p className="text-sm text-muted-foreground">No pending follow-ups</p>}
            {pending.map((f: any) => (
              <div key={f.id} className="flex items-center gap-3 bg-muted rounded-lg p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{f.description}</p>
                  <p className="text-xs text-muted-foreground">{f.leads?.name} · {format(new Date(f.reminder_at), "MMM d, h:mm a")}</p>
                </div>
                {timeBadge(f.reminder_at)}
                <Button size="sm" variant="outline" onClick={() => updateFollowUp.mutate({ id: f.id, completed: true })}>
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Done
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Completed ({completed.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completed.length === 0 && <p className="text-sm text-muted-foreground">No completed follow-ups</p>}
            {completed.map((f: any) => (
              <div key={f.id} className="flex items-center gap-3 bg-muted rounded-lg p-3 opacity-70">
                <div className="flex-1">
                  <p className="text-sm line-through">{f.description}</p>
                  <p className="text-xs text-muted-foreground">{f.leads?.name} · {format(new Date(f.reminder_at), "MMM d, h:mm a")}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => updateFollowUp.mutate({ id: f.id, completed: false })}>
                  <Undo2 className="mr-1 h-3 w-3" /> Undo
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
