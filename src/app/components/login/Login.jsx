"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logged in:", { email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0F19] relative overflow-hidden px-4">
      
      
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/20 to-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-500/10 blur-[130px] pointer-events-none" />

      
      <div className="max-w-5xl w-full bg-[#131B2E]/70 backdrop-blur-xl rounded-3xl border border-white/[0.06] shadow-2xl shadow-black/40 overflow-hidden grid md:grid-cols-12 min-h-[600px]">
        
       
        <div className="hidden md:flex md:col-span-7 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-4000">
          
       
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute -inset-y-40 -inset-x-40 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 transform pointer-events-none" />

       
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xl font-bold tracking-tight text-white">Tutors - Finder</span>
            </div>
          </div>
          
       
          <div className="relative z-10 space-y-5 max-w-md">
            <span className="text-xs font-semibold uppercase tracking-widest text-white font-extrabold px-3 py-1 rounded-full border border-cyan-400">
              Premium E-Learning Platform
            </span>
            <h2 className="text-4xl font-bold text-white font-extrabold leading-[1.2] tracking-tight">
              Learn from the best tutors worldwide.
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed font-light">
              Access personalized dashboard, interactive live classrooms, and monitor your skill growth seamless way.
            </p>
          </div>

       
          <div className="relative z-10 flex gap-8 border-t border-white/10 pt-6">
            <div>
              <p className="text-xl font-bold text-white">15k+</p>
              <p className="text-xs text-indigo-200">Expert Tutors</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">4.9/5</p>
              <p className="text-xs text-indigo-200">User Rating</p>
            </div>
          </div>
        </div>

       
        <div className="md:col-span-5 p-8 sm:p-12 flex flex-col justify-center bg-[#0F1626]/90">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">Welcome back</h3>
            <p className="text-xs text-slate-400 mt-2">
              Please enter your details to sign in to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
          
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#172033] border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 text-sm"
              />
            </div>

          
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition duration-150">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#172033] border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs font-semibold select-none"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

          
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded bg-[#172033] border-slate-700 text-blue-500 focus:ring-blue-500/30 accent-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-slate-400 cursor-pointer select-none">
                Keep me logged in
              </label>
            </div>

          
            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-xl p-[1px] focus:outline-none font-medium text-sm transition-all duration-300 active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 rounded-xl" />
              <div className="px-4 py-3.5 rounded-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 relative group-hover:bg-transparent text-white text-center font-semibold tracking-wide transition-all duration-300 shadow-md shadow-blue-600/20">
                Sign In to Dashboard
              </div>
            </button>
          </form>
         
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0F1626] px-3 text-slate-500 font-medium tracking-widest">Or connect with</span>
            </div>
          </div>
       
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-[#172033]/60 hover:bg-[#172033] border border-slate-700/50 text-slate-200 font-medium py-3 px-4 rounded-xl transition-all duration-200 text-sm hover:border-slate-600"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-11 0-.746-.08-1.32-.176-1.895H12.24z"
              />
            </svg>
            Continue with Google
          </button>
         
          <p className="text-center text-xs text-slate-500 mt-8">
            New to our platform?{" "}
            <a href="#" className="font-semibold text-blue-400 hover:underline">
              Create an account
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}