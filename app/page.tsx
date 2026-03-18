import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border border-border bg-card px-4 py-1 text-xs uppercase tracking-[0.2em] text-accent">
        AIDEK Intake Platform
      </span>
      <h1 className="font-[var(--font-jakarta)] text-4xl font-bold sm:text-5xl">Private Registration System</h1>
      <p className="max-w-2xl text-muted">
        Public users can submit details at the private form. Admin can securely log in to review every submission.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/private" className="rounded-xl border border-accent/40 bg-accent/10 px-5 py-3 font-medium text-accent hover:bg-accent/20">
          Open Public Form
        </Link>
        <Link href="/admin/login" className="rounded-xl border border-border bg-card px-5 py-3 font-medium text-white hover:border-accent/50">
          Admin Login
        </Link>
      </div>
    </main>
  );
}
