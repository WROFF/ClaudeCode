import Link from "next/link";
import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/auth-buttons";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h1>Google Login Demo</h1>
      <p className="muted">Next.js App Router + Auth.js with Sign in with Google.</p>

      <div className="card">
        {session?.user ? (
          <>
            <div className="profile">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "avatar"}
                  width={48}
                  height={48}
                />
              )}
              <div>
                <strong>{session.user.name}</strong>
                <div className="muted">{session.user.email}</div>
              </div>
            </div>
            <p>
              You are signed in. <Link href="/dashboard">Go to your dashboard →</Link>
            </p>
            <SignOut />
          </>
        ) : (
          <>
            <p>You are not signed in.</p>
            <SignIn />
          </>
        )}
      </div>
    </>
  );
}
