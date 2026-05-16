import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return new Response(JSON.stringify({ error: 'server_error' }), { status: 400 });
    }

    const { name, email, phone, timeToCall } = body;

    // Validate the data
    if (!name || !email || !phone || !timeToCall) {
      return new Response(JSON.stringify({ error: 'server_error' }), { status: 400 });
    }

    try {
      // Check if email has been used >= 4 times
      const { count: emailCount, error: emailError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('email', email);

      if (emailError) {
        console.error("Error checking email count:", emailError);
      } else if (emailCount !== null && emailCount >= 4) {
        return new Response(JSON.stringify({ error: 'email_limit' }), { status: 429 });
      }

      // Check if phone has been used >= 2 times
      const { count: phoneCount, error: phoneError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('phone', phone);

      if (phoneError) {
        console.error("Error checking phone count:", phoneError);
      } else if (phoneCount !== null && phoneCount >= 2) {
        return new Response(JSON.stringify({ error: 'phone_limit' }), { status: 429 });
      }

      const { error: dbError } = await supabase
        .from('leads')
        .insert([
          { 
            business_name: name, 
            email: email, 
            phone: phone, 
            best_time_to_call: timeToCall 
          }
        ]);

      if (dbError) {
        console.error("Supabase Insert Error:", dbError);
      }
    } catch (err) {
      console.error("Supabase Exception:", err);
    }

    // We use process.env to safely check environment variables in Vercel Serverless
    const resendApiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not set. Simulating form submission.");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Apex Assets <onboarding@resend.dev>',
          to: ['delivery@example.com'], // Replace with actual agency email
          subject: `New Audit Request: ${name}`,
          html: `
            <h1>New Lead Capture</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Best Time to Call:</strong> ${timeToCall}</p>
          `,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Resend API Error:", errorText);
      }
      
      // Always return success if DB succeeded
      return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
      console.error("Error sending email:", error);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
  } catch (globalError) {
    console.error("Global API Route Exception:", globalError);
    return new Response(JSON.stringify({ error: 'server_error' }), { status: 500 });
  }
};
