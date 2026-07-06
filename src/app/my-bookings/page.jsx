"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  XCircle,
  ShieldAlert,
  BookOpen,
  ArrowRight,
  X,
  AlertTriangle,
  User,
  Mail,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

function MyBookingsContent() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMyBookings = () => {
    setLoading(true);
    const token = localStorage.getItem("tutorsphere_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/bookings?email=${user.email}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) fetchMyBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("tutorsphere_token");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/bookings/${selectedBooking._id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Booking cancelled successfully!");
        setIsCancelModalOpen(false);
        setBookings((prev) =>
          prev.map((b) => (b._id === selectedBooking._id ? { ...b, status: "cancelled" } : b))
        );
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCount = bookings.filter((b) => b.status !== "cancelled").length;
  const cancelledCount = bookings.filter((b) => b.status === "cancelled").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">My Booked Sessions</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              View, monitor, and manage your private tutoring sessions
            </p>
          </div>
          {bookings.length > 0 && (
            <div className="flex gap-3 mt-4 sm:mt-0">
              <div className="text-center bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl px-4 py-2">
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{activeCount}</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-500 font-semibold">Active</p>
              </div>
              <div className="text-center bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl px-4 py-2">
                <p className="text-xl font-black text-red-600 dark:text-red-400">{cancelledCount}</p>
                <p className="text-xs text-red-700 dark:text-red-500 font-semibold">Cancelled</p>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <BookOpen className="h-16 w-16 text-slate-200 dark:text-slate-700 mx-auto mb-5" />
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No bookings yet</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-8 max-w-sm mx-auto">
              You haven't booked any tutoring sessions yet. Browse our tutors and book your first session!
            </p>
            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-500 transition-all active:scale-[0.98]"
            >
              Browse Tutors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/30">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tutor Name</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Student Name</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Session Date</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-950/30 transition-colors ${booking.status === "cancelled" ? "opacity-60" : ""}`}
                  >
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      {booking.tutorName}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {booking.studentName}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Mail className="h-3.5 w-3.5" />
                        {booking.studentEmail}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Calendar className="h-3.5 w-3.5 text-blue-500" />
                        {booking.sessionStartDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        booking.status === "cancelled"
                          ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/30"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                      }`}>
                        {booking.status === "cancelled" ? "Cancelled" : "Active"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {booking.status !== "cancelled" ? (
                        <button
                          onClick={() => openCancelModal(booking)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-500 border border-red-200 dark:border-red-900/30 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold italic">
                          Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 text-center relative">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950/30 text-amber-600 mb-5">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Cancel This Session?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to cancel your session with{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                "{selectedBooking?.tutorName}"
              </span>
              ? This will free up the slot for other students.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                No, Keep
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 py-2.5 text-sm font-bold text-white shadow-md transition-colors disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? "Processing..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
