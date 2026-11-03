"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiUser, FiImage, FiSave } from "react-icons/fi";

function ProfileContent() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      // Update locally (in a real app, would call API)
      const updated = { ...user!, name: form.name, photoURL: form.photoURL };
      login(updated);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="avatar mb-3">
              <div className="w-24 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                <Image
                  src={
                    form.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || "U")}&background=16a34a&color=fff&size=128`
                  }
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || "U")}&background=16a34a&color=fff&size=128`;
                  }}
                />
              </div>
            </div>
            <p className="text-sm text-base-content/60">{user?.email}</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Display Name</span></label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input input-bordered w-full pl-9"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Photo URL</span></label>
              <div className="relative">
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="url"
                  value={form.photoURL}
                  onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                  className="input input-bordered w-full pl-9"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-green-600 hover:bg-green-700 text-white w-full border-none gap-2"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : <><FiSave size={16} /> Save Changes</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}
