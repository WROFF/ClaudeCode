import Link from "next/link";
import { auth } from "@/auth";
import { SignOut } from "@/components/auth-buttons";

// Protected by middleware.ts — unauthenticated requests never reach here.
export default async function Dashboard() {
  const session = await auth();
  const user = session!.user!;

  return (
    <>
      <h1>Dashboard</h1>
      <p className="muted">A protected page, only visible when signed in.</p>

      <div className="card">
        <div className="profile">
          {user.image && (
            <img src={user.image} alt={user.name ?? "avatar"} width={48} height={48} />
          )}
          <div>
            <strong>{user.name}</strong>
            <div className="muted">{user.email}</div>
          </div>
        </div>
        <SignOut />
      </div>

      <p style={{ marginTop: "2rem" }}>
        <Link href="/">← Back home</Link>
      </p>
    </>
  );
}
