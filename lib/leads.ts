import { supabase } from "@/lib/supabase";

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  property_id: number | null;
  status: LeadStatus;
  created_at: string;
};

export async function getLeads() {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Lead[];
}

export async function updateLeadStatus(id: number, status: LeadStatus) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.from("leads").update({ status }).eq("id", id).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Lead;
}
