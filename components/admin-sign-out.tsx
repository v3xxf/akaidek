"use client";

import { signOut } from "next-auth/react";

export function AdminSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-white hover:border-accent/50"
    >
      Sign out
    </button>
  );
}
