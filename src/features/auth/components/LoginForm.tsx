"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [show, setShow] = useState(false);
  const { login, loading, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(login)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type={show ? "text" : "password"}
        placeholder="••••••••"
        leftIcon={<Lock className="w-4 h-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="p-0.5"
          >
            {show ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        }
        error={errors.password?.message}
        {...register("password")}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <Button type="submit" variant="primary" loading={loading}>
        Sign in
      </Button>
    </form>
  );
}
