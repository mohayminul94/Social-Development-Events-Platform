"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { registerUser, validatePassword } from "@/lib/auth";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", photoURL: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    const passErr = validatePassword(form.password);
    if (passErr) e.password = passErr;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await registerUser(form);
      login(data.user || data);
      toast.success("Account created! Welcome to CommUnity ðŸŽ‰");
      router.push("/");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">ðŸŒ±</div>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-base-content/60 text-sm mt-1">Join CommUnity and start making a difference</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Full Name</span></label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`input input-bordered w-full pl-9 ${errors.name ? "input-error" : ""}`}
                />
              </div>
              {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email Address</span></label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`input input-bordered w-full pl-9 ${errors.email ? "input-error" : ""}`}
                />
              </div>
              {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Photo URL <span className="text-base-content/40">(optional)</span></span></label>
              <div className="relative">
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={form.photoURL}
                  onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                  className="input input-bordered w-full pl-9"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min 6 chars, upper + lowercase"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`input input-bordered w-full pl-9 pr-10 ${errors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
              <div className="mt-1 space-y-0.5">
                {[
                  { test: form.password.length >= 6, label: "At least 6 characters" },
                  { test: /[A-Z]/.test(form.password), label: "One uppercase letter" },
                  { test: /[a-z]/.test(form.password), label: "One lowercase letter" },
                ].map(({ test, label }) => (
                  <p key={label} className={`text-xs ${test ? "text-green-600" : "text-base-content/40"}`}>
                    {test ? "âœ“" : "â—‹"} {label}
                  </p>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-green-600 hover:bg-green-700 text-white w-full border-none mt-2"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-base-content/60">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
