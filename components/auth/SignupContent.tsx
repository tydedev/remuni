"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useForm } from "react-hook-form";
import { signupSchema, SignupSchema } from "@/schema/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { Spinner } from "../spinners/Spinner";
import { signIn } from "next-auth/react";

export const SignupContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error);
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      setSuccess(
        "Abbiamo inviato un’email di conferma. Controlla la tua casella di posta."
      );
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case "USER_ALREADY_EXISTS":
            setError("Non puoi registrarti con questa email.");
            break;
          case "INVALID_FIELDS":
            setError("Compila correttamente tutti i campi.");
            break;
          default:
            setError("Qualcosa è andato storto. Riprova.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success && (
          <p className="text-xs text-green-600 bg-green-50 flex items-start justify-start gap-2 p-3 border-green-600 border rounded">
            <CheckCircle size={16} /> {success}
          </p>
        )}
        {error && (
          <p className="text-xs text-red-600 bg-red-50 flex items-start justify-start gap-2 p-3 border-red-600 border rounded">
            <X size={16} />
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="w-full mt-3"
          variant={"indigo"}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner text="Creo account..." size="sm" />
          ) : (
            <>
              <span>Crea il tuo account</span>
              <MdOutlineArrowRightAlt className="h-4 w-4 shrink-0" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
