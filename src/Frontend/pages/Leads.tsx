import { useState, useMemo } from "react";
import AppLayout from "@/Frontend/components/AppLayout";
import { useLeads, useDeleteLead, Lead } from "@/Client/hooks/useLeads";
import { Button } from "@/Frontend/components/ui/button";
import { Input } from "@/Frontend/components/ui/input";
import { Badge } from "@/Frontend/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Frontend/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Frontend/components/ui/table";
import LeadFormDialog from "@/Frontend/components/LeadFormDialog";
import LeadDetailSheet from "@/Frontend/components/LeadDetailSheet";
import { Plus, Search, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const statusBadge: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-warning/10 text-warning",
  converted: "bg-success/10 text-success",
  lost: "bg-destructive/10 text-destructive",
};

export default function LeadsPage() {
  const { data: leads = [] } = useLeads();
  const deleteLead = useDeleteLead();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [detailLead, setDetailLead] = useState<Lead | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter((l) =>
      l.name.toLowerCase().includes(q) ||
      (l.email || "").toLowerCase().includes(q) ||
      (l.company || "").toLowerCase().includes(q) ||
      (l.lead_source || "").toLowerCase().includes(q)
    );
  }, [leads, search]);

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Leads</h1>
          <Button onClick={() => { setEditLead(null); setDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add Lead
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="pl-9" />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name / Email</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setDetailLead(l)}>
                  <TableCell>
                    <p className="font-medium text-sm">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.email || "—"}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{l.company || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{l.lead_source || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${statusBadge[l.status]} capitalize text-xs`}>{l.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{format(new Date(l.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setDetailLead(l)}><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setEditLead(l); setDialogOpen(true); }}><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteLead.mutate(l.id)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">No leads found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <LeadFormDialog open={dialogOpen} onOpenChange={setDialogOpen} lead={editLead} />
        <LeadDetailSheet open={!!detailLead} onOpenChange={(o) => !o && setDetailLead(null)} lead={detailLead} />
      </div>
    </AppLayout>
  );
}
