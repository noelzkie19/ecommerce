"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useRegister";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Mail, Lock, User } from "lucide-react";

interface RegisterFormProps {
  /** Affiliate referral code passed via ?ref= query param */
  referralCode?: string;
}

export function RegisterForm({ referralCode }: RegisterFormProps = {}) {
  const {
    register: doRegister,
    loading,
    error,
  } = useRegister({ referralCode });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(doRegister)} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Noel De Leon"
        leftIcon={<User className="w-4 h-4" />}
        error={errors.fullName?.message}
        {...register("fullName")}
      />
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
        type="password"
        placeholder="Min 8 chars, 1 uppercase, 1 number"
        leftIcon={<Lock className="w-4 h-4" />}
        error={errors.password?.message}
        {...register("password")}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <Button type="submit" variant="secondary" loading={loading}>
        Create Account
      </Button>
    </form>
  );
}
