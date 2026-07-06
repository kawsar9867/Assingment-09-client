"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-red-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />

        <div className="text-center relative z-10 max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-8 shadow-xl">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 mb-6">
            <AlertOctagon className="h-10 w-10 animate-bounce" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Unexpected Error</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Something went wrong during data load or component rendering. Please retry the operation.
          </p>
          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors active:scale-[0.98]"
          >
            <RotateCcw className="h-4.5 w-4.5" />
            Try Again
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
