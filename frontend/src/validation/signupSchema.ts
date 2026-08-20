import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .regex(
      /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
      "Name can only contain letters"
    ),

    email: z.email("Please enter a valid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
