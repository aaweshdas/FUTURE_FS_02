import { useState, useMemo } from "react";
import AppLayout from "@/Frontend/components/AppLayout";
import { useLeads, useUpdateLead, Lead } from "@/Client/hooks/useLeads";
import LeadDetailSheet from "@/Frontend/components/LeadDetailSheet";
import { Badge } from "@/Frontend/components/ui/badge";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Mail, Building2, Globe } from "lucide-react";

const columns: { id: Lead["status"]; label: string; color: string }[] = [
  { id: "new", label: "New", color: "bg-primary" },
  { id: "contacted", label: "Contacted", color: "bg-warning" },
  { id: "converted", label: "Converted", color: "bg-success" },
  { id: "lost", label: "Lost", color: "bg-destructive" },
];

export default function PipelinePage() {
  const { data: leads = [] } = useLeads();
  const updateLead = useUpdateLead();
  const [detailLead, setDetailLead] = useState<Lead | null>(null);

  const grouped = useMemo(() => {
    const g: Record<string, Lead[]> = { new: [], contacted: [], converted: [], lost: [] };
    leads.forEach((l) => g[l.status]?.push(l));
    return g;
  }, [leads]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId as Lead["status"];
    const leadId = result.draggableId;
    if (newStatus !== result.source.droppableId) {
      updateLead.mutate({ id: leadId, status: newStatus });
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Pipeline</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {columns.map((col) => (
              <div key={col.id} className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-semibold">{col.label}</h3>
                  <Badge variant="secondary" className="text-xs ml-auto">{grouped[col.id].length}</Badge>
                </div>
                <Droppable droppableId={col.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[100px]">
                      {grouped[col.id].map((lead, idx) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setDetailLead(lead)}
                              className={`bg-card border border-border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow ${
                                snapshot.isDragging ? "shadow-lg ring-2 ring-primary/20" : ""
                              }`}
                            >
                              <p className="text-sm font-medium mb-1">{lead.name}</p>
                              {lead.company && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                  <Building2 className="h-3 w-3" />{lead.company}
                                </div>
                              )}
                              {lead.email && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                  <Mail className="h-3 w-3" />{lead.email}
                                </div>
                              )}
                              {lead.lead_source && (
                                <Badge variant="secondary" className="text-[10px] mt-1">
                                  <Globe className="h-2.5 w-2.5 mr-1" />{lead.lead_source}
                                </Badge>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
        <LeadDetailSheet open={!!detailLead} onOpenChange={(o) => !o && setDetailLead(null)} lead={detailLead} />
      </div>
    </AppLayout>
  );
}
