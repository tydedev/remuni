import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email non valida"),
  password: z.string().min(1, "Inserisci la password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
