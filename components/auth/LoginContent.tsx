"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinners/Spinner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(1, "Inserisci la password"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res || res.error) {
        throw new Error("INVALID_CREDENTIALS");
      }

      router.push("/dashboard");
    } catch {
      setError("Email o password non corrette.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="text-xs text-red-600 bg-red-50 flex items-start justify-start gap-2 p-3 border-red-600 border rounded">
            <X size={16} />
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full mt-3"
          variant="indigo"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner text="Accesso in corso..." size="sm" />
          ) : (
            <>
              <span>Accedi</span>
              <MdOutlineArrowRightAlt className="h-4 w-4 shrink-0" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
