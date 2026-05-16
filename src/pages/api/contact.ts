import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    // We are temporarily bypassing all logic to test if Vercel can handle POST requests without crashing.
    return redirect('/?success=true');
  } catch (globalError) {
    console.error("Global API Route Exception:", globalError);
    return new Response(null, { status: 302, headers: { Location: '/?error=server_error' } });
  }
};
