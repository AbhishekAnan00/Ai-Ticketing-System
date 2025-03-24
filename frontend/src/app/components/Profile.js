"use client";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Login from "./Login";

export default function Profile() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
    if (tokenFromStorage) {
      try {
        const decoded = jwtDecode(tokenFromStorage);
        setUserName(decoded.name || decoded.email || "User");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="mb-2">Welcome, <span className="font-semibold">{userName}</span>!</p>
      </div>
    </div>
  );
}
