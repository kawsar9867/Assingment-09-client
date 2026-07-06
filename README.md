# 🎓 TutorSphere — Find & Book Expert Tutors

> A full-stack tutor booking platform that connects students with verified expert tutors across 120+ subjects, featuring real-time slot management, JWT authentication, and a rich modern UI.

**🌐 Live Site:** [https://tutor-booking-system-blond.vercel.app](https://tutor-booking-system-blond.vercel.app)

**🖥️ Client Repository:** [https://github.com/kawsar9867/Assingment-09-client](https://github.com/kawsar9867/Assingment-09-client)

**🛠️ Server Repository:** [https://github.com/kawsar9867/Assingment-09-Sever-](https://github.com/kawsar9867/Assingment-09-Sever-)

---

## ✨ Key Features

- **🔐 JWT-Secured Authentication** — Email/password and Google OAuth login powered by Better-Auth. On every login (including social), a JWT token is issued by the Express server and stored client-side. All private API routes are protected with Bearer token verification.

- **📅 Smart Session Slot System** — Each tutor has a configurable slot limit. Bookings atomically decrement available slots using a MongoDB `$inc` operator with a `$gt: 0` guard to prevent double-booking. Cancellations automatically restore the slot count. Session date gates prevent early bookings.

- **🔍 Advanced Search & Filter** — The Tutors page supports real-time case-insensitive name search via MongoDB `$regex` and date-range filtering using `$gte`/`$lte` operators on tutor registration dates — all without page reload.

- **🌙 Dark / Light Theme** — Full dark/light mode toggle persisted to `localStorage` and respecting the user's OS preference on first visit. Theme state is managed globally via React Context and applied through Tailwind CSS `dark:` utilities.

- **📋 Full CRUD Tutor Management** — Logged-in tutors can add, view, update (via pre-filled modal), and delete their own tutor listings. Ownership is verified server-side using the decoded JWT email. All CRUD actions show instant toast notifications without page reload.

- **🗂️ Personalized Booking Dashboard** — Students see only their own booked sessions in a clean table view. Each booking can be cancelled via a confirmation modal, which sends a `PATCH` request to update status to `"cancelled"` and restores the tutor's available slot.

- **🎠 Rich Hero Carousel** — An autoplay Swiper.js coverflow carousel with 3+ meaningful slides, navigation arrows, and dynamic pagination dots. Each slide contains a CTA button linking to the Tutors page.

- **🛡️ Protected Routes** — All private pages (Add Tutor, My Tutors, My Booked Sessions, Tutor Details) are wrapped in a `PrivateRoute` component. Authenticated state is preserved across page reloads using Better-Auth server sessions — logged-in users are never redirected to login on refresh.

- **📱 Fully Responsive** — Tailored layouts for mobile, tablet, and desktop using Tailwind CSS grid and flexbox. The Navbar collapses into a hamburger menu on mobile with a smooth dropdown.

- **🔔 Toast Notification System** — All CRUD operations, authentication events, and errors are communicated through `react-hot-toast` — zero default browser alerts used anywhere in the app.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | Better-Auth (Email + Google OAuth) |
| UI Components | Lucide React, Swiper.js, HeroUI |
| State Management | React Context API |
| Notifications | react-hot-toast |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth Tokens | JWT (jsonwebtoken) |
| Deployment | Vercel (client + server) |

---

## 📦 Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page with banner carousel, 6 featured tutors, and 2 extra sections |
| `/tutors` | Public | All tutors with search & date filter |
| `/tutors/[id]` | Private | Tutor detail page with booking modal |
| `/add-tutor` | Private | Create a new tutor listing |
| `/my-tutors` | Private | View/edit/delete your own tutors |
| `/my-bookings` | Private | View and cancel your booked sessions |
| `/login` | Public | Email/password + Google login |
| `/register` | Public | User registration with password validation |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT=your_google_client_id
GOOGLE_SECTET=your_google_secret
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.jsx           # Home page
│   ├── layout.jsx         # Root layout with providers
│   ├── tutors/
│   │   ├── page.jsx       # All tutors + search/filter
│   │   └── [id]/page.jsx  # Tutor details + booking
│   ├── add-tutor/page.jsx
│   ├── my-tutors/page.jsx
│   ├── my-bookings/page.jsx
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── not-found.jsx
│   └── error.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Banner.jsx
│   ├── PrivateRoute.jsx
│   └── DynamicTitle.jsx
├── context/
│   ├── AuthProvider.jsx
│   └── ThemeContext.jsx
└── lib/
    └── auth-client.js
```

---

## 📝 License

MIT © 2025 TutorSphere
