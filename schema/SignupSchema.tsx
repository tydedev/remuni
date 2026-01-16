import { z } from "zod";

export const password = () =>
  z
    .string()
    .refine((password) => password.length >= 8, {
      message: "La password deve contenere almeno 8 caratteri",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "La password deve contenere almeno una lettera maiuscola",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "La password deve contenere almeno una lettera minuscola",
    })
    .refine((password) => /\d/.test(password), {
      message: "La password deve contenere almeno un numero",
    });

export const signupSchema = () =>
  z.object({
    email: z.email({ message: "Inserisci un indirizzo email valido" }),
    password: password(),
  });

export type SignupSchema = z.infer<ReturnType<typeof signupSchema>>;
