import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminSignOut } from "@/components/admin-sign-out";

type Props = {
  searchParams?: Promise<{ q?: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export default async function AdminDashboardPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  const params = searchParams ? await searchParams : {};
  const q = params.q?.trim() || "";

  const submissions = await prisma.submission.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q } },
            { emailAddress: { contains: q } },
            { phoneNumber: { contains: q } },
            { city: { contains: q } },
            { state: { contains: q } }
          ]
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 500
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-border bg-card/90 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin Dashboard</p>
          <h1 className="mt-2 font-[var(--font-jakarta)] text-2xl font-bold sm:text-3xl">Private Form Submissions</h1>
          <p className="mt-2 text-sm text-muted">Total records: {submissions.length}</p>
        </div>
        <div className="flex items-center gap-3">
          <form className="flex gap-2" action="/admin" method="get">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search name, email, phone..."
              className="w-64 rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
            <button className="rounded-xl border border-border bg-background px-3 py-2 text-sm hover:border-accent/50" type="submit">
              Search
            </button>
          </form>
          <AdminSignOut />
        </div>
      </header>

      <section className="overflow-x-auto rounded-2xl border border-border bg-card/80">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-background/80 text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Trading</th>
              <th className="px-4 py-3">Income & Capital</th>
              <th className="px-4 py-3">Mindset</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/80">
            {submissions.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-muted" colSpan={7}>
                  No submissions found.
                </td>
              </tr>
            ) : (
              submissions.map((item) => (
                <tr key={item.id} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-xs text-muted">Age: {item.age}</p>
                    <p className="text-xs text-muted">Education: {item.education}</p>
                    <p className="text-xs text-muted">Instagram: {item.instagramUsername || "-"}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p>{item.phoneNumber}</p>
                    <p className="text-xs text-muted">{item.emailAddress}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p>{item.city}</p>
                    <p className="text-xs text-muted">{item.state}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="capitalize">{item.tradingExperience.replace("_", " ")}</p>
                    <p className="text-xs text-muted">Funded account: {item.wantsFundedAccount ? "Yes" : "No"}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p>{item.expectedRegularIncome}</p>
                    <p className="text-xs text-accent">
                      Invest: ${Number(item.amountToInvest).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted">Has $200 minimum: {item.hasMinimumTwoHundred ? "Yes" : "No"}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="capitalize">{item.decisionSeriousness.replace("_", " ")}</p>
                    <p className="text-xs text-muted">Dream income: {item.dreamIncome}</p>
                    <p className="text-xs text-muted">Favourite car: {item.favouriteCar}</p>
                  </td>
                  <td className="px-4 py-4 text-xs text-muted">{formatDate(item.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
