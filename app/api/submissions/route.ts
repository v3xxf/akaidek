import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { submissionSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  const rl = rateLimit(`submission:${ip}`, 8, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many submissions. Please wait a minute and try again."
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.retryAfterMs ?? 60_000) / 1000))
        }
      }
    );
  }

  const payload = await request.json();
  const parsed = submissionSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const created = await prisma.submission.create({
    data: {
      name: data.name,
      age: data.age,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      instagramUsername: data.instagramUsername || null,
      education: data.education,
      city: data.city,
      state: data.state,
      tradingExperience: data.tradingExperience,
      expectedRegularIncome: data.expectedRegularIncome,
      amountToInvest: data.amountToInvest,
      decisionSeriousness: data.decisionSeriousness,
      favouriteCar: data.favouriteCar,
      dreamIncome: data.dreamIncome,
      hasMinimumTwoHundred: true,
      wantsFundedAccount: data.wantsFundedAccount
    }
  });

  return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
}
