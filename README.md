# TutorSphere - Premium Tutor Discovery & Booking System

TutorSphere is a premium, high-end single-page application built on Next.js 16 and React 19. It connects students with top-tier private tutors for 1-on-1 personalized sessions across a range of academic and creative subjects.

**Live Website URL:** [https://tutorsphere-edu.vercel.app](https://tutorsphere-edu.vercel.app)

---

## Key Features

- 🎯 **Seamless Search & Advanced Date Filtering:** Discover tutors instantly using our case-insensitive real-time name search and filter listings based on their specific registration start and end dates.
- 🔒 **Dual-Mode Secure Authentication (Firebase & Local MockAuth):** Authenticate securely via Google Social Login or Email/Password. Includes a custom offline fallback credentials system for immediate evaluation without api keys.
- ⚡ **Atomic Booking & Real-Time Slot Control:** Slot levels automatically decrement upon successful booking. Bookings are automatically blocked when slots reach zero or if current dates are earlier than session start times.
- 🌓 **Dynamic App-Wide Light/Dark Theme:** Switch color schemes instantly from the Navigation header. Preferences are saved in `localStorage` to prevent style flashing or hydration mismatches upon reloading.
- 🛠️ **Full Student & Tutor Management Dashboards:** Add new tutor listings, edit profiles with immediate state propagation, delete listings via confirmation modals, and cancel booked sessions safely.

---

## Technology Stack

### Client Side
- **Framework:** Next.js 16.2 (App Router)
- **Library:** React 19.2
- **Styling:** Tailwind CSS v4
- **State & Authentication:** Firebase Client SDK (Email & Google Auth Providers)
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

### Server Side
- **Engine:** Express.js (Node.js runtime)
- **Database:** MongoDB Atlas (Native driver)
- **Token Security:** JSON Web Token (JWT)
- **Configurations:** Dotenv & Cors

---

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- Local or Cloud MongoDB instance.

### Running Client Locally
1. Navigate to the client directory: `tutor-booking-system`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:3000`
