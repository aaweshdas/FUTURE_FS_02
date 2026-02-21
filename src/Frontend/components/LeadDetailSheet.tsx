import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/Frontend/components/ui/sheet";
import { Badge } from "@/Frontend/components/ui/badge";
import { Button } from "@/Frontend/components/ui/button";
import { Input } from "@/Frontend/components/ui/input";
import { Textarea } from "@/Frontend/components/ui/textarea";
import { Lead, useLeadNotes, useCreateNote, useFollowUps, useCreateFollowUp, useUpdateFollowUp } from "@/Client/hooks/useLeads";
import { format } from "date-fns";
import { Mail, Phone, Building2, Globe, Send, CheckCircle2, Circle, Loader2 } from "lucide-react";

const statusBadge: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-warning/10 text-warning",
  converted: "bg-success/10 text-success",
  lost: "bg-destructive/10 text-destructive",
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
}

export default function LeadDetailSheet({ open, onOpenChange, lead }: Props) {
  const { data: notes = [] } = useLeadNotes(lead?.id);
  const { data: followUps = [] } = useFollowUps(lead?.id);
  const createNote = useCreateNote();
  const createFollowUp = useCreateFollowUp();
  const updateFollowUp = useUpdateFollowUp();

  const [newNote, setNewNote] = useState("");
  const [fuDesc, setFuDesc] = useState("");
  const [fuDate, setFuDate] = useState("");

  if (!lead) return null;

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await createNote.mutateAsync({ lead_id: lead.id, note: newNote });
    setNewNote("");
  };

  const handleAddFollowUp = async () => {
    if (!fuDesc.trim() || !fuDate) return;
    await createFollowUp.mutateAsync({ lead_id: lead.id, description: fuDesc, reminder_at: new Date(fuDate).toISOString() });
    setFuDesc("");
    setFuDate("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            {lead.name}
            <Badge variant="secondary" className={statusBadge[lead.status]}>{lead.status}</Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact info */}
          <div className="space-y-2">
            {lead.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" />{lead.email}</div>}
            {lead.phone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" />{lead.phone}</div>}
            {lead.company && <div className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-muted-foreground" />{lead.company}</div>}
            {lead.lead_source && <div className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-muted-foreground" />{lead.lead_source}</div>}
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Notes</h3>
            <div className="flex gap-2 mb-3">
              <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a note..." className="min-h-[60px]" />
              <Button size="icon" onClick={handleAddNote} disabled={createNote.isPending} className="flex-shrink-0 self-end">
                {createNote.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {notes.map((n: any) => (
                <div key={n.id} className="bg-muted rounded-lg p-3">
                  <p className="text-sm">{n.note}</p>
                  <p className="text-xs text-muted-foreground mt-1">{format(new Date(n.created_at), "MMM d, h:mm a")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-ups */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Follow-ups</h3>
            <div className="space-y-2 mb-3">
              <Input value={fuDesc} onChange={(e) => setFuDesc(e.target.value)} placeholder="Description" />
              <div className="flex gap-2">
                <Input type="datetime-local" value={fuDate} onChange={(e) => setFuDate(e.target.value)} />
                <Button onClick={handleAddFollowUp} disabled={createFollowUp.isPending} size="sm">Add</Button>
              </div>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {followUps.map((f: any) => (
                <div key={f.id} className="flex items-start gap-2 bg-muted rounded-lg p-3">
                  <button onClick={() => updateFollowUp.mutate({ id: f.id, completed: !f.completed })} className="mt-0.5 flex-shrink-0">
                    {f.completed ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm ${f.completed ? "line-through text-muted-foreground" : ""}`}>{f.description}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(f.reminder_at), "MMM d, h:mm a")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
