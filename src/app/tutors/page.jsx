"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Calendar,
  RefreshCw,
  DollarSign,
  MapPin,
  ArrowRight,
  GraduationCap,
  Clock,
  Filter,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function TutorsContent() {
  const searchParams = useSearchParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTutors = (overrideSearch, overrideStart, overrideEnd) => {
    setLoading(true);
    const params = new URLSearchParams();
    const s = overrideSearch !== undefined ? overrideSearch : search;
    const sd = overrideStart !== undefined ? overrideStart : startDate;
    const ed = overrideEnd !== undefined ? overrideEnd : endDate;

    if (s) params.append("search", s);
    if (sd) params.append("startDate", sd);
    if (ed) params.append("endDate", ed);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    fetchTutors("", "", "");
  };

  const handleSearch = () => {
    fetchTutors();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchTutors();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/40 px-4 py-1.5 rounded-full mb-4">
            Find Your Tutor
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Search & Filter Tutors
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Discover educators and filter by name, subject, or registration timeline.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-md mb-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Search by Tutor Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  id="tutor-search-input"
                  type="text"
                  placeholder="e.g. Clara, Arthur..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Registration Start Date */}
            <div className="w-full lg:w-52">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Reg Start Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="h-4 w-4" />
                </span>
                <input
                  id="reg-start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Registration End Date */}
            <div className="w-full lg:w-52">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Reg End Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="h-4 w-4" />
                </span>
                <input
                  id="reg-end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 w-full lg:w-auto">
              <button
                id="search-btn"
                onClick={handleSearch}
                className="flex-1 lg:flex-initial bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-blue-500/25 active:scale-[0.98]"
              >
                <Filter className="h-4 w-4" />
                Search
              </button>
              <button
                id="reset-filters-btn"
                onClick={handleReset}
                title="Reset Filters"
                className="p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active filter indicators */}
          {(search || startDate || endDate) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold self-center">Active filters:</span>
              {search && (
                <span className="text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30 font-semibold px-3 py-1 rounded-full">
                  Name: "{search}"
                </span>
              )}
              {startDate && (
                <span className="text-xs bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30 font-semibold px-3 py-1 rounded-full">
                  From: {startDate}
                </span>
              )}
              {endDate && (
                <span className="text-xs bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30 font-semibold px-3 py-1 rounded-full">
                  To: {endDate}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tutors Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading tutors...</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10">
            <BookOpen className="h-14 w-14 text-slate-300 dark:text-slate-600 mx-auto mb-5" />
            <p className="text-xl text-slate-700 dark:text-slate-300 font-bold mb-2">No tutors found</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
              Try adjusting your search criteria or reset filters to see all tutors.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <RefreshCw className="h-4 w-4" />
              Reset all filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
              Showing <span className="font-bold text-slate-900 dark:text-white">{tutors.length}</span> tutor{tutors.length !== 1 ? "s" : ""}
              {search && <> matching <span className="font-bold text-blue-600 dark:text-blue-400">"{search}"</span></>}
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {tutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200/60 dark:hover:border-blue-800/40"
                >
                  {/* Image */}
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

                  {/* Details */}
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
                      id={`book-tutor-${tutor._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-blue-500/25 active:scale-[0.98]"
                    >
                      Book Session
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function TutorsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TutorsContent />
    </Suspense>
  );
}
