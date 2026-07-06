"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none dark:bg-blue-600/20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none dark:bg-indigo-600/20" />

        <div className="text-center relative z-10 max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-8 shadow-xl">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 mb-6">
            <FileQuestion className="h-10 w-10 animate-pulse" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">404</h1>
          <h2 className="text-xl font-bold mb-4">Page Not Found</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors active:scale-[0.98]"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
