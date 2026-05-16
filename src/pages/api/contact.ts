import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const timeToCall = formData.get('timeToCall');

    // Validate the data
    if (!name || !email || !phone || !timeToCall) {
      return redirect('/?error=server_error');
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
        return redirect('/?error=email_limit');
      }

      // Check if phone has been used >= 2 times
      const { count: phoneCount, error: phoneError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('phone', phone);

      if (phoneError) {
        console.error("Error checking phone count:", phoneError);
      } else if (phoneCount !== null && phoneCount >= 2) {
        return redirect('/?error=phone_limit');
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

    const resendApiKey = import.meta.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not set. Simulating form submission.");
      // Simulate successful submission for demo purposes
      return redirect('/?success=true');
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

      if (res.ok) {
        return redirect('/?success=true');
      } else {
        const errorData = await res.json();
        console.error("Resend API Error:", errorData);
        return redirect('/?error=server_error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return redirect('/?error=server_error');
    }
  } catch (globalError) {
    console.error("Global API Route Exception:", globalError);
    return redirect('/?error=server_error');
  }
};
