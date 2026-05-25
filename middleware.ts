export { auth as middleware } from "@/auth";

// Run the auth middleware only on protected routes. Unauthenticated users
// hitting these paths are redirected to the Google sign-in flow.
export const config = {
  matcher: ["/dashboard/:path*"],
};
