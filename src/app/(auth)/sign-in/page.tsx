"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user.email} <br />
        <button
          className=" bg-orange-400 rounded px-3 py-1 m-4 "
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button
        className=" bg-orange-400 rounded px-3 py-1 m-4 "
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
