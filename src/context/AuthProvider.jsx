"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";

export const AuthContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AuthProvider({ children }) {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getJWTToken = useCallback(async (email) => {
    try {
      const response = await fetch(`${API_URL}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("tutorsphere_token", data.token);
        return data.token;
      }
    } catch (error) {
      console.error("JWT token generation failed:", error);
    }
    return null;
  }, []);

  useEffect(() => {
    if (session?.user) {
      const userData = {
        email: session.user.email,
        displayName: session.user.name,
        photoURL: session.user.image,
      };
      setUser(userData);
      getJWTToken(session.user.email);
    } else {
      setUser(null);
      localStorage.removeItem("tutorsphere_token");
    }
    if (!sessionLoading) {
      setLoading(false);
    }
  }, [session, sessionLoading, getJWTToken]);

  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoURL,
      });
      if (error) throw new Error(error.message);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      localStorage.removeItem("tutorsphere_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name, photoURL) => {
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name,
        image: photoURL,
      });
      if (error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}
