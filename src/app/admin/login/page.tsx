"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function HalamanLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email atau password salah.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <LockClosedIcon className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Admin Login</h1>
          <p className="text-neutral-500 text-sm mt-1">Portfolio Management</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-neutral-300/30 rounded-xl p-6 space-y-4 shadow-sm"
        >
          {error && (
            <div className="px-3 py-2 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-on-surface mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 rounded-md border border-neutral-300/50 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-on-surface mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 rounded-md border border-neutral-300/50 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-400 mt-4">
          <a href="/" className="hover:text-primary transition-colors">
            ← Kembali ke Portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
