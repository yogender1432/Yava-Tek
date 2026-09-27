
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginUI() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    employeeId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Change User/Admin
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError("");

    // Remove employee ID when switching to User
    if (selectedRole === "user") {
      setFormData((prev) => ({
        ...prev,
        employeeId: "",
      }));
    }
  };

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // Employee ID required only for admin
    if (role === "admin" && !formData.employeeId.trim()) {
      setError("Please enter your Employee ID.");
      setLoading(false);
      return;
    }

    try {
      // Data matching your backend
      const loginData = {
        email: formData.email.trim(),
        password: formData.password,
        role: role,

        ...(role === "admin" && {
          employeeId: formData.employeeId.trim(),
        }),
      };

      console.log("Login Data:", loginData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/yp/user/login`,
        loginData
      );

      console.log("Login Response:", response.data);

      // Save token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Save user
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // Redirect according to backend role
      if (response.data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        {/* User / Admin */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Login As
          </p>

          <div className="grid grid-cols-2 gap-3">

            {/* User */}
            <button
              type="button"
              onClick={() => handleRoleChange("user")}
              className={`py-3 rounded-lg font-semibold border transition-all ${
                role === "user"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              User
            </button>

            {/* Admin */}
            <button
              type="button"
              onClick={() => handleRoleChange("admin")}
              className={`py-3 rounded-lg font-semibold border transition-all ${
                role === "admin"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Admin
            </button>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email / Phone */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email or Phone Number
            </label>

            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email or phone number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              outline-none transition
              focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500"
            />
          </div>

          {/* Employee ID - Admin Only */}
          {role === "admin" && (
            <div>
              <label
                htmlFor="employeeId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Employee ID
              </label>

              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="Enter Employee ID"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                outline-none transition
                focus:ring-2 focus:ring-indigo-500
                focus:border-indigo-500"
              />

              <p className="text-xs text-gray-500 mt-1">
                Enter the Employee ID registered with your admin account.
              </p>
            </div>
          )}

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">

              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>

            </div>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              outline-none transition
              focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700
            text-white font-semibold rounded-lg shadow-md
            transition disabled:opacity-50
            disabled:cursor-not-allowed"
          >
            {loading
              ? "Signing In..."
              : role === "admin"
              ? "Sign In as Admin"
              : "Sign In as User"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
