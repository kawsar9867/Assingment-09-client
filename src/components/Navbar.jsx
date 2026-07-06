"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
import { ThemeContext } from "@/context/ThemeContext";
import {
  GraduationCap,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  BookMarked,
  PlusCircle,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully. See you soon!");
      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    pathname === href
      ? "text-blue-600 dark:text-blue-400 font-semibold"
      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400";

  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/tutors", label: "Tutors" },
  ];

  const privateNavLinks = [
    { href: "/add-tutor", label: "Add Tutor", icon: PlusCircle },
    { href: "/my-tutors", label: "My Tutors", icon: BookOpen },
    { href: "/my-bookings", label: "My Booked Sessions", icon: BookMarked },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md group-hover:shadow-blue-500/30 transition-shadow duration-300">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Tutor<span className="text-blue-600 dark:text-blue-400">Sphere</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1">
              {publicNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive(link.href)}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user &&
                privateNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive(link.href)}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">
              {/* Dark/Light Theme Toggle */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
              >
                {theme === "dark" ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )}
              </button>

              {/* Auth Controls */}
              {loading ? (
                <div className="w-9 h-9 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : user ? (
                /* Profile Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    id="profile-dropdown-btn"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                  >
                    <div className="h-7 w-7 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0 bg-blue-100 dark:bg-blue-900">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-300">
                            {(user.displayName || user.email || "U")[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="hidden sm:block text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user.displayName || user.email?.split("@")[0]}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl py-1.5 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>

                      {/* Private Links in Dropdown */}
                      {privateNavLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150"
                          >
                            <Icon className="h-4 w-4 text-slate-400" />
                            {link.label}
                          </Link>
                        );
                      })}

                      <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                        <button
                          id="logout-btn"
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-150 rounded-b-2xl"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Auth Buttons */
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    id="login-link"
                    href="/login"
                    className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    id="register-link"
                    href="/register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.98]"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4.5 w-4.5" />
                ) : (
                  <Menu className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900">
            <div className="px-4 py-3 space-y-1">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${isActive(link.href)}`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  {privateNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${isActive(link.href)}`}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
