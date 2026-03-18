import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  age: z.coerce.number().int().min(18, "Age must be 18+").max(100),
  phoneNumber: z
    .string()
    .trim()
    .min(8, "Phone number is too short")
    .max(20)
    .regex(/^[+0-9\-\s()]+$/, "Phone number format is invalid"),
  emailAddress: z.string().trim().email("Email is invalid"),
  instagramUsername: z.string().trim().max(50).optional().or(z.literal("")),
  education: z.string().trim().min(2, "Education is required").max(120),
  city: z.string().trim().min(2, "City is required").max(80),
  state: z.string().trim().min(2, "State is required").max(80),
  tradingExperience: z.enum(["none", "beginner", "intermediate", "advanced"]),
  expectedRegularIncome: z.string().trim().min(2, "Expected regular income is required").max(120),
  amountToInvest: z.coerce.number().min(200, "Minimum amount is 200 USD").max(100000000),
  decisionSeriousness: z.enum(["very_serious", "exploring", "not_sure"]),
  favouriteCar: z.string().trim().min(2, "Favourite car is required").max(120),
  dreamIncome: z.string().trim().min(2, "Dream income is required").max(120),
  hasMinimumTwoHundred: z
    .boolean()
    .refine((value) => value, { message: "200 dollars minimum confirmation is required" }),
  wantsFundedAccount: z.boolean()
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
