"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success("Password reset successful!");
      setDone(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2 className="text-2xl text-green-600">
          Password successfully reset!
        </h2>
        <a href="/login" className="text-blue-500 underline mt-4">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4 font-semibold">Reset Password</h1>

      <input
        type="password"
        placeholder="Enter new password"
        className="p-2 border border-gray-300 rounded-lg mb-4 w-72"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleResetPassword}
        className="p-2 bg-green-500 text-white rounded-lg w-72"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}
