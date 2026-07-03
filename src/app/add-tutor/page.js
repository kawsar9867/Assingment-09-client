"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/firebase/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Award,
  BookOpen,
  Layers,
  PlusCircle,
  Image as ImageIcon,
  User,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Spanish",
  "French",
  "History",
  "Geography",
  "Art & Design",
  "Music",
];

function AddTutorForm() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [availableDays, setAvailableDays] = useState("Sun - Thu");
  const [availableTime, setAvailableTime] = useState("5:00 PM - 8:00 PM");
  const [hourlyFee, setHourlyFee] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [sessionStartDate, setSessionStartDate] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [institution, setInstitution] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("Both");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 text-slate-900 dark:text-slate-100";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image || !hourlyFee || !totalSlots || !sessionStartDate || !registrationStartDate || !registrationEndDate || !institution || !location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("tutorsphere_token");

    const tutorData = {
      name,
      image,
      subject,
      availableDays,
      availableTime,
      hourlyFee: parseFloat(hourlyFee),
      totalSlots: parseInt(totalSlots),
      sessionStartDate,
      registrationStartDate,
      registrationEndDate,
      institution,
      location,
      mode,
      email: user.email,
      creatorName: user.displayName || "Anonymous",
    };

    try {
      const res = await fetch("http://localhost:5000/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tutorData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Tutor listing published successfully!");
        router.push("/my-tutors");
      } else {
        toast.error(data.message || "Failed to create tutor listing.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <div className="flex-grow max-w-4xl w-full mx-auto px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Add Tutor Listing</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Share your expertise — create a tutoring session others can book
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl rounded-3xl p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Section: Basic Info */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-5 flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tutor Name */}
                <div>
                  <label className={labelClass}>Tutor Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe"
                    className={inputClass}
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className={labelClass}>Photo URL (imgbb / postimage) *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ImageIcon className="h-4 w-4" />
                    </span>
                    <input
                      type="url"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://i.postimg.cc/..."
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className={labelClass}>Subject / Category *</label>
                  <div className="relative">
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      {subjects.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <Layers className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Teaching Mode */}
                <div>
                  <label className={labelClass}>Teaching Mode *</label>
                  <div className="relative">
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Both">Both (Hybrid)</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <Layers className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label className={labelClass}>Institution & Experience *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Award className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Stanford University, 5 Years Exp"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className={labelClass}>Location (Area/City) *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. San Francisco, CA"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Schedule & Pricing */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-5 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Schedule & Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Available Days */}
                <div>
                  <label className={labelClass}>Available Days *</label>
                  <input
                    type="text"
                    required
                    value={availableDays}
                    onChange={(e) => setAvailableDays(e.target.value)}
                    placeholder="e.g. Sun - Thu or Mon, Wed, Fri"
                    className={inputClass}
                  />
                </div>

                {/* Available Time */}
                <div>
                  <label className={labelClass}>Available Time Slot *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Clock className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={availableTime}
                      onChange={(e) => setAvailableTime(e.target.value)}
                      placeholder="e.g. 5:00 PM - 8:00 PM"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Hourly Fee */}
                <div>
                  <label className={labelClass}>Hourly Fee (USD) *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <DollarSign className="h-4 w-4" />
                    </span>
                    <input
                      type="number"
                      required
                      min="1"
                      value={hourlyFee}
                      onChange={(e) => setHourlyFee(e.target.value)}
                      placeholder="e.g. 45"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Total Slots */}
                <div>
                  <label className={labelClass}>Total Slot Limit *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={totalSlots}
                    onChange={(e) => setTotalSlots(e.target.value)}
                    placeholder="e.g. 10"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section: Dates */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-5 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Session Dates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Session Start Date */}
                <div>
                  <label className={labelClass}>Session Start Date *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <input
                      type="date"
                      required
                      value={sessionStartDate}
                      onChange={(e) => setSessionStartDate(e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Reg Start Date */}
                <div>
                  <label className={labelClass}>Registration Start Date *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <input
                      type="date"
                      required
                      value={registrationStartDate}
                      onChange={(e) => setRegistrationStartDate(e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Reg End Date */}
                <div>
                  <label className={labelClass}>Registration End Date *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <input
                      type="date"
                      required
                      value={registrationEndDate}
                      onChange={(e) => setRegistrationEndDate(e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                id="publish-tutor-btn"
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-md hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
              >
                <CheckCircle className="h-5 w-5" />
                {isSubmitting ? "Publishing..." : "Publish Tutor Session"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function AddTutorPage() {
  return (
    <PrivateRoute>
      <AddTutorForm />
    </PrivateRoute>
  );
}
