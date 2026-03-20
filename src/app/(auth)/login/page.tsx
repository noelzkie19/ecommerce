"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  LoginForm,
  RegisterForm,
  GoogleButton,
  useForgotPassword,
} from "@/features/auth";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const { send, loading, message } = useForgotPassword();
  const [forgotEmail, setForgotEmail] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <ShoppingCart className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Welcome to Triad E-Commerce
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === "forgot" ? "Reset your password" : "Sign in to continue"}
          </p>
        </div>

        {mode !== "forgot" && (
          <>
            <GoogleButton />
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </>
        )}

        {mode === "login" && <LoginForm />}
        {mode === "signup" && <RegisterForm />}
        {mode === "forgot" && (
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="forgot-email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {message && (
              <p
                className={`text-xs ${message.includes("sent") ? "text-green-600" : "text-red-500"}`}
              >
                {message}
              </p>
            )}
            <button
              onClick={() => send(forgotEmail)}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </div>
        )}

        <div className="flex justify-between mt-4 text-sm">
          {mode === "login" && (
            <button
              onClick={() => setMode("forgot")}
              className="text-gray-500 hover:text-gray-700"
            >
              Forgot password?
            </button>
          )}
          {mode === "forgot" ? (
            <button onClick={() => setMode("login")} className="text-gray-500">
              &larr; Back to Sign in
            </button>
          ) : (
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-gray-500 ml-auto"
            >
              {mode === "login" ? "Need an account? " : "Already have one? "}
              <span className="font-semibold text-gray-900">
                {mode === "login" ? "Sign up" : "Sign in"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
