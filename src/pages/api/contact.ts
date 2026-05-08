import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const timeToCall = formData.get('timeToCall');

  // Validate the data
  if (!name || !email || !phone || !timeToCall) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
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
      return new Response(
        JSON.stringify({ message: "Failed to send email" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
};
