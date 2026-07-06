"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Edit3,
  Trash2,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Award,
  BookOpen,
  Layers,
  PlusCircle,
  ImageIcon,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "Computer Science", "English", "Spanish", "French",
  "History", "Geography", "Art & Design", "Music",
];

const inputClass =
  "w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 text-slate-900 dark:text-slate-100";

const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5";

function MyTutorsContent() {
  const { user } = useContext(AuthContext);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Update form state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [subject, setSubject] = useState("");
  const [availableDays, setAvailableDays] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [hourlyFee, setHourlyFee] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [sessionStartDate, setSessionStartDate] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [institution, setInstitution] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMyTutors = () => {
    setLoading(true);
    const token = localStorage.getItem("tutorsphere_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/my-tutors?email=${user.email}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTutors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) fetchMyTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const openUpdateModal = (tutor) => {
    setSelectedTutor(tutor);
    setName(tutor.name || "");
    setImage(tutor.image || "");
    setSubject(tutor.subject || subjects[0]);
    setAvailableDays(tutor.availableDays || "");
    setAvailableTime(tutor.availableTime || "");
    setHourlyFee(tutor.hourlyFee || "");
    setTotalSlots(tutor.totalSlots !== undefined ? tutor.totalSlots : "");
    setSessionStartDate(tutor.sessionStartDate || "");
    setRegistrationStartDate(tutor.registrationStartDate || "");
    setRegistrationEndDate(tutor.registrationEndDate || "");
    setInstitution(tutor.institution || "");
    setLocation(tutor.location || "");
    setMode(tutor.mode || "Both");
    setIsUpdateOpen(true);
  };

  const openDeleteModal = (tutor) => {
    setSelectedTutor(tutor);
    setIsDeleteOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("tutorsphere_token");

    const updatedData = {
      name, image, subject, availableDays, availableTime,
      hourlyFee: parseFloat(hourlyFee),
      totalSlots: parseInt(totalSlots),
      sessionStartDate, registrationStartDate, registrationEndDate,
      institution, location, mode,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors/${selectedTutor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success("Tutor listing updated successfully!");
        setIsUpdateOpen(false);
        setTutors((prev) =>
          prev.map((t) => (t._id === selectedTutor._id ? { ...t, ...updatedData } : t))
        );
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update listing.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("tutorsphere_token");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors/${selectedTutor._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Tutor listing deleted successfully!");
        setIsDeleteOpen(false);
        setTutors((prev) => prev.filter((t) => t._id !== selectedTutor._id));
      } else {
        toast.error("Failed to delete listing.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">My Hosted Tutors</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              View, edit, and manage your private tutor slot offerings
            </p>
          </div>
          <Link
            href="/add-tutor"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-500 transition-all duration-200 active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Tutor
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading your tutors...</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <BookOpen className="h-16 w-16 text-slate-200 dark:text-slate-700 mx-auto mb-5" />
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              No tutor listings yet
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-8 max-w-sm mx-auto">
              You haven't added any tutors yet. Create your first listing to start scheduling learning sessions.
            </p>
            <Link
              href="/add-tutor"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-500 transition-all active:scale-[0.98]"
            >
              <PlusCircle className="h-4 w-4" />
              Add Your First Tutor
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/30">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tutor Profile</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Subject</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Hourly Fee</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Mode</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Slots</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tutors.map((tutor) => (
                  <tr key={tutor._id} className="hover:bg-slate-50 dark:hover:bg-slate-950/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={tutor.image || "https://i.postimg.cc/mD7gQ5R3/tutor1.jpg"}
                          alt={tutor.name}
                          className="h-11 w-11 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&q=80"; }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{tutor.name}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" />
                            {tutor.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                        {tutor.subject}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      ${tutor.hourlyFee}/hr
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        tutor.mode === "Online"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : tutor.mode === "Offline"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                          : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400"
                      }`}>
                        {tutor.mode}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold text-sm ${tutor.totalSlots === 0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {tutor.totalSlots === 0 ? "Fully Booked" : `${tutor.totalSlots} Slots`}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openUpdateModal(tutor)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(tutor)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 relative">
            <button
              onClick={() => setIsUpdateOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30">
                <Edit3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Update Tutor Session</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Modify the details for "{selectedTutor?.name}"</p>
              </div>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Tutor Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Photo URL</label>
                  <input type="url" required value={image} onChange={(e) => setImage(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Subject</label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className={`${inputClass} appearance-none`}>
                    {subjects.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Teaching Mode</label>
                  <select value={mode} onChange={(e) => setMode(e.target.value)} className={`${inputClass} appearance-none`}>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Both">Both (Hybrid)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Hourly Fee ($)</label>
                  <input type="number" required min="1" value={hourlyFee} onChange={(e) => setHourlyFee(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Total Slots</label>
                  <input type="number" required min="0" value={totalSlots} onChange={(e) => setTotalSlots(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Available Days</label>
                  <input type="text" required value={availableDays} onChange={(e) => setAvailableDays(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Available Time</label>
                  <input type="text" required value={availableTime} onChange={(e) => setAvailableTime(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Institution & Exp</label>
                  <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Session Start Date</label>
                  <input type="date" required value={sessionStartDate} onChange={(e) => setSessionStartDate(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Reg Start Date</label>
                  <input type="date" required value={registrationStartDate} onChange={(e) => setRegistrationStartDate(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Reg End Date</label>
                <input type="date" required value={registrationEndDate} onChange={(e) => setRegistrationEndDate(e.target.value)} className={inputClass} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md hover:bg-blue-500 transition-all duration-200 disabled:opacity-50 flex items-center gap-2 active:scale-[0.98]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 text-center relative">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/30 text-red-600 mb-5">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Listing?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-slate-900 dark:text-white">"{selectedTutor?.name}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                No, Keep
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 py-2.5 text-sm font-bold text-white shadow-md transition-colors disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function MyTutorsPage() {
  return (
    <PrivateRoute>
      <MyTutorsContent />
    </PrivateRoute>
  );
}
