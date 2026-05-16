import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    let name, email, phone, timeToCall;
    try {
      const bodyText = await request.text();
      const params = new URLSearchParams(bodyText);
      name = params.get('name');
      email = params.get('email');
      phone = params.get('phone');
      timeToCall = params.get('timeToCall');
    } catch (parseError) {
      console.error("Failed to parse form data:", parseError);
      return redirect('/?error=server_error');
    }

    // Validate the data
    if (!name || !email || !phone || !timeToCall) {
      return redirect('/?error=server_error');
    }

    // WE ARE BYPASSING SUPABASE AND RESEND TO TEST IF request.text() CRASHES
    return redirect('/?success=true');

  } catch (globalError) {
    console.error("Global API Route Exception:", globalError);
    return redirect('/?error=server_error');
  }
};
