"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/firebase/AuthProvider";
import { ThemeContext } from "@/context/ThemeContext";
import { Sun, Moon, Menu, X, ChevronDown, User, LogOut, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Successfully logged out");
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to log out");
    }
  };

  const linkClass = (path) => {
    const base = "font-medium transition-colors duration-200 text-sm py-2 px-3 rounded-lg";
    const active = "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40";
    const inactive = "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/40";
    return pathname === path ? `${base} ${active}` : `${base} ${inactive}`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
                TutorSphere
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-1">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/tutors" className={linkClass("/tutors")}>
              Tutors
            </Link>
            
            {user && (
              <>
                <Link href="/add-tutor" className={linkClass("/add-tutor")}>
                  Add Tutor
                </Link>
                <Link href="/my-tutors" className={linkClass("/my-tutors")}>
                  My Tutors
                </Link>
                <Link href="/my-bookings" className={linkClass("/my-bookings")}>
                  My Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* Right Side Tools (Theme, Auth, Mobile Menu Toggle) */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* Auth Buttons / Profile Dropdown */}
            <div className="hidden md:flex md:items-center">
              {!user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 px-4 py-2 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all active:scale-[0.98]"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1.5 rounded-full p-0.5 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    <img
                      src={user.photoURL || "https://i.postimg.cc/mD7gQ5R3/tutor1.jpg"}
                      alt={user.displayName || "User avatar"}
                      className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-slate-800 dark:bg-slate-900">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <p className="text-sm font-semibold text-slate-950 dark:text-white truncate">
                          {user.displayName || "Learner"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/my-bookings"
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950 md:hidden dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800 md:hidden bg-white dark:bg-slate-900 px-4 py-3 space-y-2.5 transition-all duration-300">
          <Link
            href="/"
            className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tutors"
            className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Tutors
          </Link>

          {user ? (
            <>
              <Link
                href="/add-tutor"
                className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Tutor
              </Link>
              <Link
                href="/my-tutors"
                className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                My Tutors
              </Link>
              <Link
                href="/my-bookings"
                className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                My Booked Sessions
              </Link>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "https://i.postimg.cc/mD7gQ5R3/tutor1.jpg"}
                    alt={user.displayName || "User avatar"}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="max-w-[150px]">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {user.displayName || "Learner"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex flex-col gap-2">
              <Link
                href="/login"
                className="flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
