"use client";

import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
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
  User,
  Phone,
  CheckCircle,
  ShieldAlert,
  ArrowLeft,
  Layers,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

function TutorDetailsContent() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTutorDetails = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutor details:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) fetchTutorDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBookSession = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error("Phone number is required for booking.");
      return;
    }

    // Client-side validations
    if (tutor.totalSlots <= 0) {
      toast.error("No available slots left.");
      return;
    }

    const currentDate = new Date();
    const sessionDate = new Date(tutor.sessionStartDate);
    if (currentDate < sessionDate) {
      toast.error("Booking is not available yet for this tutor.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("tutorsphere_token");

    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      studentName: user.displayName || "Learner",
      studentEmail: user.email,
      phone: phone.trim(),
      sessionStartDate: tutor.sessionStartDate,
      price: tutor.hourlyFee,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Session booked successfully! Check My Booked Sessions.");
        setIsModalOpen(false);
        setPhone("");
        fetchTutorDetails();
      } else {
        toast.error(data.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred during booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading tutor profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!tutor || tutor.error) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center px-4">
          <div className="text-6xl font-black text-slate-200 dark:text-slate-800">404</div>
          <p className="text-xl font-bold text-slate-700 dark:text-slate-300">Tutor Profile Not Found</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
            The tutor you're looking for may have been removed or the link is incorrect.
          </p>
          <button
            onClick={() => router.push("/tutors")}
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Tutors
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const currentDate = new Date();
  const sessionDate = new Date(tutor.sessionStartDate);
  const isBookingDateBlocked = currentDate < sessionDate;
  const isFullyBooked = tutor.totalSlots <= 0;

  const modeColors = {
    Online: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400",
    Offline: "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400",
    Both: "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400",
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <div className="flex-grow max-w-5xl w-full mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Tutors
        </button>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12">

            {/* Left Col: Photo & Main Info */}
            <div className="md:col-span-5 relative">
              <div className="relative h-64 md:h-full min-h-[300px]">
                <img
                  src={tutor.image || "https://i.postimg.cc/mD7gQ5R3/tutor1.jpg"}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&q=80"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3 ${modeColors[tutor.mode] || "bg-blue-100 text-blue-800"}`}>
                    {tutor.mode} Learning
                  </span>
                  <span className="ml-2 inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-blue-600 text-white">
                    {tutor.subject}
                  </span>
                  <h2 className="text-2xl font-extrabold mt-2">{tutor.name}</h2>
                  <p className="text-sm text-white/80 font-medium mt-1 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-yellow-300" />
                    {tutor.institution}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Expanded Details */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col gap-6">

              {/* Info Grid */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                  Session Overview
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Location</span>
                    <span className="font-semibold text-sm flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" />
                      {tutor.location}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Mode</span>
                    <span className="font-semibold text-sm flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-blue-500" />
                      {tutor.mode}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Available Days</span>
                    <span className="font-semibold text-sm flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-blue-500" />
                      {tutor.availableDays}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Time Slot</span>
                    <span className="font-semibold text-sm flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-500" />
                      {tutor.availableTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Registration Timelines */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                  Registration Timelines
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Reg Opens", value: tutor.registrationStartDate },
                    { label: "Reg Closes", value: tutor.registrationEndDate },
                    { label: "Session Starts", value: tutor.sessionStartDate },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-3"
                    >
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-1">{item.label}</p>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee & Slots */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100/80 dark:border-blue-900/30 p-4 rounded-2xl">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Hourly Fee</span>
                  <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 mt-1 flex items-center">
                    <DollarSign className="h-6 w-6" />
                    {tutor.hourlyFee}
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1 self-end mb-1">/ hour</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Available Slots</span>
                  <p className={`text-2xl font-extrabold mt-1 ${isFullyBooked ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {isFullyBooked ? "0 Left" : `${tutor.totalSlots} Left`}
                  </p>
                </div>
              </div>

              {/* Restriction Warnings */}
              {isFullyBooked && (
                <div className="flex items-start gap-3 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-3.5 rounded-xl">
                  <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>This session is fully booked. You can't join at the moment.</span>
                </div>
              )}
              {isBookingDateBlocked && !isFullyBooked && (
                <div className="flex items-start gap-3 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 p-3.5 rounded-xl">
                  <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Booking not available yet. Session starts on <strong>{tutor.sessionStartDate}</strong>.</span>
                </div>
              )}

              {/* Book Button */}
              <button
                id="open-booking-modal-btn"
                onClick={() => setIsModalOpen(true)}
                disabled={isFullyBooked || isBookingDateBlocked}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-md hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                <BookOpen className="h-5 w-5" />
                Book Private Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Confirm Booking</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Complete the form to book your session</p>
              </div>
            </div>

            <form onSubmit={handleBookSession} className="space-y-4">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Student Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    disabled
                    value={user?.displayName || "Learner"}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-500 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Student Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Student Email
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-500 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Tutor Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Tutor Name
                </label>
                <input
                  type="text"
                  disabled
                  value={tutor.name}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-500 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Tutor ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Tutor ID (Auto-filled)
                </label>
                <input
                  type="text"
                  disabled
                  value={tutor._id}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-500 focus:outline-none cursor-not-allowed truncate font-mono text-xs"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Your Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    id="booking-phone-input"
                    type="tel"
                    required
                    placeholder="+1 (555) 012-3456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setPhone(""); }}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="confirm-booking-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-500 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function TutorDetailsPage() {
  return (
    <PrivateRoute>
      <TutorDetailsContent />
    </PrivateRoute>
  );
}
