import { z } from "zod";

export const gradeLevels = [
  "KINDERGARTEN", "GRADE_1", "GRADE_2", "GRADE_3", "GRADE_4", "GRADE_5",
  "GRADE_6", "GRADE_7", "GRADE_8", "GRADE_9", "GRADE_10", "GRADE_11",
  "GRADE_12", "UNDERGRAD", "GRADUATE",
] as const;

export const registerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  username: z
    .string()
    .min(3, "Username needs at least 3 characters")
    .max(20, "Username can be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, and underscores only"),
  password: z
    .string()
    .min(8, "Password needs at least 8 characters")
    .max(128, "Password can be at most 128 characters"),
  dateOfBirth: z.coerce.date().refine(
    (d) => d < new Date() && d > new Date("1900-01-01"),
    "Enter a valid date of birth"
  ),
  gradeLevel: z.enum(gradeLevels),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean().optional().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Password needs at least 8 characters").max(128),
});

export const checkoutSchema = z.object({
  plan: z.enum(["MONTHLY", "YEARLY"]),
});
