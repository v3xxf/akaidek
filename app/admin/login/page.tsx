"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const callbackUrl = "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl
    });

    if (!result || result.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    window.location.href = callbackUrl;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <section className="w-full rounded-2xl border border-border bg-card/90 p-6 shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Admin Access</p>
        <h1 className="mt-2 font-[var(--font-jakarta)] text-3xl font-bold">Login to Dashboard</h1>
        <p className="mt-2 text-sm text-muted">Only authorized admin users can access submissions.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              placeholder="admin@aidek.in"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm text-danger">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border border-accent/40 bg-accent/10 px-5 py-3 font-semibold text-accent hover:bg-accent/20 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
