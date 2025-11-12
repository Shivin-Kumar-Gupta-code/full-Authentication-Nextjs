"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      toast.success("Login successful!");
      console.log("Login success:", response.data);

      // ✅ Redirect to profile page after a small delay (for better UX)
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      console.log("Login failed:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable button only when email & password are filled
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold mb-4">
        {loading ? "Processing..." : "Login"}
      </h1>

      <hr className="w-1/2 mb-6" />

      <label htmlFor="email" className="font-medium">
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600 w-64"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password" className="font-medium">
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-2 focus:border-gray-600 w-64"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />

      {/* 👇 Forgot Password Link */}
      <div className="mb-4 text-sm text-gray-600">
        <Link href="/forgotpassword" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        onClick={onLogin}
        className={`p-2 rounded-lg w-64 text-white ${
          buttonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={buttonDisabled || loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm mt-3">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
