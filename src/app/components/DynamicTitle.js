"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    let title = "TutorSphere | Find Your Perfect Tutor";
    if (pathname === "/") {
      title = "TutorSphere | Discover Expert Tutors";
    } else if (pathname === "/login") {
      title = "TutorSphere | Access Account";
    } else if (pathname === "/register") {
      title = "TutorSphere | Join as Member";
    } else if (pathname === "/tutors") {
      title = "TutorSphere | Search Tutors";
    } else if (pathname === "/add-tutor") {
      title = "TutorSphere | Host a Booking Session";
    } else if (pathname === "/my-tutors") {
      title = "TutorSphere | Manage My Listings";
    } else if (pathname === "/my-bookings") {
      title = "TutorSphere | My Booked Sessions";
    } else if (pathname.startsWith("/tutors/")) {
      title = "TutorSphere | Tutor Profile & Booking";
    } else if (pathname === "/404") {
      title = "TutorSphere | Page Not Found";
    }
    document.title = title;
  }, [pathname]);

  return null;
}
