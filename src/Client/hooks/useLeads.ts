import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/Client/integrations/supabase/client";
import { useAuth } from "@/Client/contexts/AuthContext";
import { toast } from "sonner";

export type Lead = {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  lead_source: string | null;
  status: "new" | "contacted" | "converted" | "lost";
  created_at: string;
  updated_at: string;
};

export function useLeads() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lead[];
    },
    enabled: !!user,
  });
}

export function useCreateLead() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (lead: Omit<Lead, "id" | "user_id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("leads")
        .insert({ ...lead, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead created successfully");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Lead> & { id: string }) => {
      const { data, error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead updated");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead deleted");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useLeadNotes(leadId: string | undefined) {
  return useQuery({
    queryKey: ["lead_notes", leadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lead_notes")
        .select("*")
        .eq("lead_id", leadId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!leadId,
  });
}

export function useCreateNote() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ lead_id, note }: { lead_id: string; note: string }) => {
      const { error } = await supabase
        .from("lead_notes")
        .insert({ lead_id, note, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["lead_notes", vars.lead_id] });
      toast.success("Note added");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useFollowUps(leadId?: string) {
  return useQuery({
    queryKey: ["follow_ups", leadId],
    queryFn: async () => {
      let q = supabase
        .from("follow_ups")
        .select("*, leads(name)")
        .order("reminder_at", { ascending: true });
      if (leadId) q = q.eq("lead_id", leadId);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
    enabled: true,
  });
}

export function useCreateFollowUp() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (fu: { lead_id: string; description: string; reminder_at: string }) => {
      const { error } = await supabase
        .from("follow_ups")
        .insert({ ...fu, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["follow_ups"] });
      qc.invalidateQueries({ queryKey: ["follow_ups", vars.lead_id] });
      toast.success("Follow-up created");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateFollowUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await supabase
        .from("follow_ups")
        .update({ completed })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["follow_ups"] });
      toast.success("Follow-up updated");
    },
    onError: (e: any) => toast.error(e.message),
  });
}
