export async function GET() {
  return Response.redirect(`${process.env.BACKEND_URL}/api/auth/google`, 302);
}
