import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const query = request.nextUrl.searchParams.get("q")?.trim() || "";

  const submissions = await prisma.submission.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { emailAddress: { contains: query } },
            { phoneNumber: { contains: query } },
            { city: { contains: query } },
            { state: { contains: query } }
          ]
        }
      : undefined,
    orderBy: {
      createdAt: "desc"
    },
    take: 500
  });

  return NextResponse.json({ ok: true, submissions });
}
