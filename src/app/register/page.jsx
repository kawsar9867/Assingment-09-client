"use client";

import React, { useState, useContext, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
import { KeyRound, Mail, User, Image as ImageIcon, Eye, EyeOff, Sparkles, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function RegisterContent() {
  const { createUser, signInWithGoogle, user, loading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  const validatePassword = (pass) => {
    if (pass.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must contain at least one lowercase letter.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const passError = validatePassword(password);
    if (passError) {
      setLocalError(passError);
      toast.error(passError);
      return;
    }

    setIsSubmitting(true);
    try {
      await createUser(email, password, name, photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop");
      toast.success("Registration successful! Welcome to TutorSphere 🎉");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      const errMsg = err.message || "Failed to create account";
      setLocalError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Successfully logged in with Google!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Google Authentication failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none dark:bg-blue-600/20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none dark:bg-indigo-600/20" />

        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl p-8 relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg mb-3">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Sign up to find, book, and review qualified tutors
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4.5 w-4.5" />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Photo URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <ImageIcon className="h-4.5 w-4.5" />
                </span>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/avatar.jpg (Optional)"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="h-4.5 w-4.5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Error Message inside Form */}
            {localError && (
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/30 p-3 text-xs text-red-600 dark:text-red-400 font-medium">
                {localError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4" />
              {isSubmitting ? "Creating Account..." : "Register Now"}
            </button>
          </form>

          {/* Social Sign-in Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                Or join via
              </span>
            </div>
          </div>

          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/80 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm hover:border-slate-300 active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Login Redirect link */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}