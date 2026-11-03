"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { FiCalendar, FiMapPin, FiType, FiImage, FiFileText, FiTag } from "react-icons/fi";
import { format } from "date-fns";

const EVENT_TYPES = ["Cleanup", "Plantation", "Donation", "Education", "Health", "Other"];

function CreateEventForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "Cleanup",
    thumbnailURL: "",
    location: "",
    eventDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const minDate = format(new Date(), "yyyy-MM-dd");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Event title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    else if (form.description.length < 20) e.description = "Description must be at least 20 characters.";
    if (!form.location.trim()) e.location = "Location is required.";
    if (!form.eventDate) e.eventDate = "Event date is required.";
    else if (new Date(form.eventDate) <= new Date()) e.eventDate = "Event date must be in the future.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post("/events", { ...form, creatorEmail: user!.email });
      toast.success("Event created successfully! ðŸŽ‰");
      router.push("/events");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to create event.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="text-base-content/60">
          Organize a community event and invite volunteers to make a difference.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Title */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Event Title *</span></label>
              <div className="relative">
                <FiType className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="text"
                  placeholder="e.g., City Park Cleanup Drive"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`input input-bordered w-full pl-9 ${errors.title ? "input-error" : ""}`}
                />
              </div>
              {errors.title && <p className="text-error text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Event Type */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Event Type *</span></label>
              <div className="relative">
                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <select
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  className="select select-bordered w-full pl-9"
                >
                  {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Thumbnail URL */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Thumbnail Image URL</span></label>
              <div className="relative">
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.thumbnailURL}
                  onChange={(e) => setForm({ ...form, thumbnailURL: e.target.value })}
                  className="input input-bordered w-full pl-9"
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Location *</span></label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="text"
                  placeholder="e.g., Central Park, New York"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className={`input input-bordered w-full pl-9 ${errors.location ? "input-error" : ""}`}
                />
              </div>
              {errors.location && <p className="text-error text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Event Date *</span></label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
                <input
                  type="date"
                  min={minDate}
                  value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  className={`input input-bordered w-full pl-9 ${errors.eventDate ? "input-error" : ""}`}
                />
              </div>
              {errors.eventDate && <p className="text-error text-xs mt-1">{errors.eventDate}</p>}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Description *</span></label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3 text-base-content/40" size={16} />
                <textarea
                  rows={4}
                  placeholder="Describe the event, its goals, and what participants should bring..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`textarea textarea-bordered w-full pl-9 resize-none ${errors.description ? "textarea-error" : ""}`}
                />
              </div>
              {errors.description && <p className="text-error text-xs mt-1">{errors.description}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-green-600 hover:bg-green-700 text-white w-full border-none"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEventForm />
    </PrivateRoute>
  );
}
