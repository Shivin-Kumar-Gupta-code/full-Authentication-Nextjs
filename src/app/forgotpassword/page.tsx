"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success("Reset link sent! Check your email.");
      setSent(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>

      {!sent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-lg mb-4 w-72"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleForgotPassword}
            className="p-2 bg-blue-500 text-white rounded-lg w-72"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </>
      ) : (
        <p className="text-green-600 mt-4">
          Reset link has been sent to your email!
        </p>
      )}
    </div>
  );
}
