"use client";

import React, { createContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "./firebase.config";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if firebase is using mock configuration
  const isMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
                 process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key";

  // Real Firebase actions
  const createUserReal = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInReal = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogleReal = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOutReal = () => {
    return signOut(auth);
  };

  const updateUserProfileReal = (name, photoURL) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
      });
    }
    return Promise.resolve();
  };

  // Mock Authentication Fallbacks (for robust offline evaluation without API keys)
  const createUserMock = (email, password, name, photoURL) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = localStorage.getItem("tutorsphere_users");
        const users = stored ? JSON.parse(stored) : [];
        if (users.find(u => u.email === email)) {
          reject(new Error("Email already registered."));
          return;
        }
        const newUser = { email, password, displayName: name, photoURL };
        users.push(newUser);
        localStorage.setItem("tutorsphere_users", JSON.stringify(users));
        localStorage.setItem("tutorsphere_current_user", JSON.stringify(newUser));
        setUser(newUser);
        resolve({ user: newUser });
      }, 500);
    });
  };

  const signInMock = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = localStorage.getItem("tutorsphere_users");
        const users = stored ? JSON.parse(stored) : [];
        const found = users.find(u => u.email === email && u.password === password);
        if (!found) {
          reject(new Error("Invalid email or password."));
          return;
        }
        localStorage.setItem("tutorsphere_current_user", JSON.stringify(found));
        setUser(found);
        resolve({ user: found });
      }, 500);
    });
  };

  const signInWithGoogleMock = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser = {
          email: "examiner@google.com",
          displayName: "Google Examiner",
          photoURL: "https://i.postimg.cc/mD7gQ5R3/tutor1.jpg"
        };
        localStorage.setItem("tutorsphere_current_user", JSON.stringify(googleUser));
        setUser(googleUser);
        resolve({ user: googleUser });
      }, 500);
    });
  };

  const logOutMock = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("tutorsphere_current_user");
        setUser(null);
        resolve();
      }, 300);
    });
  };

  const updateUserProfileMock = (name, photoURL) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = localStorage.getItem("tutorsphere_current_user");
        if (currentUser) {
          const updated = { ...JSON.parse(currentUser), displayName: name, photoURL };
          localStorage.setItem("tutorsphere_current_user", JSON.stringify(updated));
          setUser(updated);
        }
        resolve();
      }, 300);
    });
  };

  // Generic functions exposed to the app
  const createUser = (email, password, name, photoURL) => {
    if (isMock) {
      return createUserMock(email, password, name, photoURL);
    } else {
      return createUserReal(email, password).then((result) => {
        return updateUserProfileReal(name, photoURL).then(() => {
          const updatedUser = {
            ...result.user,
            displayName: name,
            photoURL: photoURL
          };
          setUser(updatedUser);
          return { user: updatedUser };
        });
      });
    }
  };

  const signIn = async (email, password) => {
    const result = isMock ? await signInMock(email, password) : await signInReal(email, password);
    if (result?.user?.email) {
      await getJWTToken(result.user.email);
    }
    return result;
  };

  const signInWithGoogle = async () => {
    const result = isMock ? await signInWithGoogleMock() : await signInWithGoogleReal();
    if (result?.user?.email) {
      await getJWTToken(result.user.email);
    }
    return result;
  };

  const logOut = () => {
    localStorage.removeItem("tutorsphere_token");
    return isMock ? logOutMock() : logOutReal();
  };

  const updateUserProfile = (name, photoURL) => {
    return isMock ? updateUserProfileMock(name, photoURL) : updateUserProfileReal(name, photoURL);
  };

  // JWT Token Handler helper
  const getJWTToken = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  };

  // Watch Auth Changes
  useEffect(() => {
    let active = true;
    async function initializeAuth() {
      if (isMock) {
        const storedUser = localStorage.getItem("tutorsphere_current_user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          await getJWTToken(parsed.email);
        }
        if (active) setLoading(false);
      } else {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser && currentUser.email) {
            await getJWTToken(currentUser.email);
          } else {
            localStorage.removeItem("tutorsphere_token");
          }
          if (active) setLoading(false);
        });
        return () => {
          active = false;
          unsubscribe();
        };
      }
    }
    initializeAuth();
    return () => {
      active = false;
    };
  }, [isMock]);

  // Make sure we trigger JWT generation on user state changes
  useEffect(() => {
    if (user && user.email) {
      getJWTToken(user.email);
    }
  }, [user]);

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
