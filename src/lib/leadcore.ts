export interface LeadData {
  name: string;
  mobile?: string;
  wa?: string;
  email?: string;
  company?: string;
  address?: string;
  website?: string;
  location?: string;
  category?: string;
  status?: string;
  notes?: string;
}

export async function saveLeadToLeadcore(data: LeadData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ggsgtahrhzzgygvzlusn.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseKey) {
    console.warn("Supabase Anon Key missing from environment.");
    return { success: false, error: "Missing Supabase Key" };
  }

  try {
    // 1. Insert Lead record into 'leads' table
    const leadPayload = {
      name: data.name || "Web Visitor",
      mobile: data.mobile || null,
      wa: data.wa || data.mobile || null,
      email: data.email || null,
      company: data.company || null,
      address: data.address || null,
      website: data.website || null,
      location: data.location || "Website Chatbot",
      category: data.category || "General Inquiry",
      status: data.status || "New AI Lead",
    };

    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify(leadPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to insert lead into Supabase:", errText);
      return { success: false, error: errText };
    }

    const insertedLeads = await res.json();
    const insertedLead = insertedLeads[0];

    // 2. If notes provided, insert into 'lead_notes' table linked to lead_id
    if (insertedLead?.id && data.notes) {
      await fetch(`${supabaseUrl}/rest/v1/lead_notes`, {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_id: insertedLead.id,
          text: `[WebbHeads AI Chatbot] ${data.notes}`,
        }),
      });
    }

    return { success: true, lead: insertedLead };
  } catch (error: any) {
    console.error("Error saving lead to Leadcore:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}
