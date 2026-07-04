"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white text-slate-600 dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-400 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                TutorSphere
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Your gateway to premium 1-on-1 education. Match with certified educators, book flexible sessions, and accelerate your learning journey.
            </p>
          </div>

          {/* Tutor Services Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Learning Streams
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tutors?search=Mathematics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Mathematics Academy
                </Link>
              </li>
              <li>
                <Link href="/tutors?search=Physics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Theoretical & Applied Physics
                </Link>
              </li>
              <li>
                <Link href="/tutors?search=Computer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Computer Science & Coding
                </Link>
              </li>
              <li>
                <Link href="/tutors?search=English" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Language & Creative Writing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>121 Learning St, Silicon Valley, CA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>support@tutorsphere.edu</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Social Community
            </h4>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-slate-100 p-2.5 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-slate-100 p-2.5 hover:bg-pink-50 hover:text-pink-600 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200">
                <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-slate-100 p-2.5 hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* New X Logo */}
              <a href="#" className="rounded-full bg-slate-100 p-2.5 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200" aria-label="X (formerly Twitter)">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          <p>© {new Date().getFullYear()} TutorSphere Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
