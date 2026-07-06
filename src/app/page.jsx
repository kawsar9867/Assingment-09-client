"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/Banner";
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Calendar,
  MapPin,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Clock,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";

const stats = [
  { icon: Users, value: "15,000+", label: "Active Learners", color: "text-cyan-400" },
  { icon: Award, value: "4.9 / 5", label: "Satisfaction Rating", color: "text-yellow-400" },
  { icon: BookOpen, value: "120+", label: "Subjects Taught", color: "text-emerald-400" },
  { icon: ShieldCheck, value: "99.8%", label: "Safe Checkouts", color: "text-purple-400" },
];

const advantages = [
  {
    icon: CheckCircle,
    title: "Verified Expert Tutors",
    desc: "Every tutor undergoes strict credential checks, teaching history reviews, and active experience verification to guarantee premium educational delivery.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Reschedule bookings or choose offline/online slots that perfectly adapt to your calendar. Learn at your own pace, from anywhere in the world.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
  },
  {
    icon: Zap,
    title: "Atomic Slot System",
    desc: "Our booking engine updates slots atomically — no double bookings, instant slot releases on cancellation, and full transparency on availability.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/20",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: Globe,
    title: "Browse Tutors",
    desc: "Search and filter from our curated pool of certified educators across 120+ subjects and disciplines.",
  },
  {
    step: "02",
    icon: HeartHandshake,
    title: "Book a Session",
    desc: "Review tutor profiles, check slot availability, and instantly book your preferred learning session.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Start Learning",
    desc: "Join your session online or offline, get personalized 1-on-1 coaching and track your progress.",
  },
];

export default function Home() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors/limit`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow">
        {/* ── Banner Section ── */}
        <HeroBanner />

        {/* ── Available Tutors Section ── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/40 px-4 py-1.5 rounded-full mb-4">
              Expert Instructors
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Available Tutors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              Browse our highly rated tutors and book a 1-on-1 private session tailored to your learning goals.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading tutors...</p>
            </div>
          ) : tutors.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg">No tutors found</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Run the seeding script to populate tutors!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {tutors.map((tutor) => (
                  <div
                    key={tutor._id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200/60 dark:hover:border-blue-800/40"
                  >
                    {/* Tutor Image */}
                    <div className="relative h-52 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img
                        src={tutor.image || "https://i.postimg.cc/mD7gQ5R3/tutor1.jpg"}
                        alt={tutor.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&q=80"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white shadow-lg">
                        {tutor.subject}
                      </span>
                      {tutor.totalSlots === 0 && (
                        <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-red-600 text-white">
                          Fully Booked
                        </span>
                      )}
                    </div>

                    {/* Tutor Details */}
                    <div className="flex flex-grow flex-col p-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {tutor.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4 flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                        {tutor.institution}
                      </p>

                      <div className="space-y-2 mb-5 flex-grow">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                          <Calendar className="h-3 w-3 text-blue-400" />
                          <span>{tutor.availableDays}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                          <Clock className="h-3 w-3 text-blue-400" />
                          <span>{tutor.availableTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                          <MapPin className="h-3 w-3 text-blue-400" />
                          <span>{tutor.location} · {tutor.mode}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mb-5">
                        <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-0.5 text-lg">
                          <DollarSign className="h-4 w-4" />
                          {tutor.hourlyFee}
                          <span className="text-xs font-normal text-slate-400 ml-1">/hr</span>
                        </span>
                        <span className={`text-xs font-bold ${tutor.totalSlots === 0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {tutor.totalSlots === 0 ? "No slots" : `${tutor.totalSlots} Slots left`}
                        </span>
                      </div>

                      <Link
                        href={`/tutors/${tutor._id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-blue-500/25 active:scale-[0.98]"
                      >
                        Book Session
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA link to Tutors Page */}
              <div className="text-center mt-14">
                <Link
                  href="/tutors"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-3.5 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 text-slate-700 dark:text-slate-200"
                >
                  Explore All Tutors
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </section>

        {/* ── How It Works Section ── */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-20 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/10 px-4 py-1.5 rounded-full mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white">
                How TutorSphere Works
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-blue-200 text-base leading-relaxed">
                Get started in three simple steps and begin your personalized learning journey today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative text-center group">
                    {/* Connector line */}
                    {idx < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-gradient-to-r from-blue-500/40 to-transparent" />
                    )}
                    <div className="relative inline-flex">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mx-auto mb-6 group-hover:bg-white/10 transition-colors duration-300 group-hover:border-blue-400/30">
                        <Icon className="h-10 w-10 text-blue-400" />
                      </div>
                      <span className="absolute -top-2 -right-2 text-xs font-black text-blue-400 bg-slate-950 border border-blue-800/50 rounded-lg px-2 py-0.5">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-blue-200/80 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-[0.98]"
              >
                Find a Tutor Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Platform Statistics ── */}
        <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 py-20 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/40 px-4 py-1.5 rounded-full mb-4">
                Platform Achievements
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
                Trusted by Thousands
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                Real numbers that reflect our community engagement and educational impact.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="relative overflow-hidden text-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
                    <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-3 relative`} />
                    <p className="text-3xl font-black text-slate-900 dark:text-white relative">{stat.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-semibold uppercase tracking-wider relative">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Why Choose TutorSphere ── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/40 px-4 py-1.5 rounded-full mb-4">
              Our Advantage
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Why Choose TutorSphere?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              We provide a premium educational experience designed around flexibility, security, and proven results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="relative group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${adv.bg} mb-5`}>
                    <Icon className={`h-7 w-7 ${adv.color}`} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{adv.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="mx-4 mb-20 sm:mx-6 lg:mx-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 py-16 px-8 text-center relative overflow-hidden shadow-2xl shadow-blue-500/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-30%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-30%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <Star className="h-8 w-8 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Accelerate Your Learning?
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-8 text-base leading-relaxed">
              Join thousands of students who have already found their perfect tutor and achieved their academic goals on TutorSphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-blue-700 shadow-lg hover:bg-blue-50 transition-all duration-200 active:scale-[0.98]"
              >
                Browse Tutors
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all duration-200 active:scale-[0.98]"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
