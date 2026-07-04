import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/firebase/AuthProvider";
import ThemeProvider from "@/context/ThemeContext";
import DynamicTitle from "@/components/DynamicTitle";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "TutorSphere",
  description: "Find and book qualified tutors easily — expert 1-on-1 tutoring for every subject and grade.",
  keywords: "tutors, tutoring, private tutor, book session, online tutor",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300 font-[family-name:var(--font-inter)]">
        <AuthProvider>
          <ThemeProvider>
            <DynamicTitle />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "12px",
                  background: "#1e293b",
                  color: "#f8fafc",
                  fontSize: "13px",
                  fontWeight: "500",
                  border: "1px solid rgba(255,255,255,0.1)",
                },
                success: {
                  iconTheme: {
                    primary: "#22c55e",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
