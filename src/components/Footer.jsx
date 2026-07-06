"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  BookOpen,
  Users,
  Calendar,
  Star,
} from "lucide-react";

const serviceLinks = [
  { label: "Browse All Tutors", href: "/tutors" },
  { label: "Book a Session", href: "/tutors" },
  { label: "Become a Tutor", href: "/add-tutor" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Tutors", href: "/my-tutors" },
];

const learningLinks = [
  { label: "Mathematics", href: "/tutors" },
  { label: "Physics & Science", href: "/tutors" },
  { label: "Computer Science", href: "/tutors" },
  { label: "Languages", href: "/tutors" },
  { label: "Art & Design", href: "/tutors" },
];

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const stats = [
  { icon: Users, value: "15K+", label: "Students" },
  { icon: BookOpen, value: "120+", label: "Subjects" },
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Calendar, value: "50K+", label: "Sessions" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      {/* Stats Row */}
      <div className="border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/20 flex-shrink-0 group-hover:bg-blue-600/30 transition-colors duration-200">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Tutor<span className="text-blue-400">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Connecting ambitious learners with verified expert tutors. 
              Personalized 1-on-1 sessions — online or offline, at your schedule.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white border border-slate-700/50 hover:border-blue-600 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tutor Services Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-5 pb-2 border-b border-slate-800">
              Tutor Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors duration-200 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Areas Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-5 pb-2 border-b border-slate-800">
              Learning Areas
            </h3>
            <ul className="space-y-3">
              {learningLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors duration-200 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-5 pb-2 border-b border-slate-800">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700/50 mt-0.5">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Address</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    123 Education Ave, Learning City, 10001
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700/50 mt-0.5">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Email</p>
                  <a
                    href="mailto:support@tutorsphere.com"
                    className="text-xs text-slate-400 hover:text-blue-400 transition-colors duration-200 mt-0.5 block"
                  >
                    support@tutorsphere.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700/50 mt-0.5">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Phone</p>
                  <a
                    href="tel:+18001234567"
                    className="text-xs text-slate-400 hover:text-blue-400 transition-colors duration-200 mt-0.5 block"
                  >
                    +1 (800) 123-4567
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} TutorSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
