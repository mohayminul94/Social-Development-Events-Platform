"use client";
import { useState } from "react";
import { Event } from "@/components/EventCard";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { format } from "date-fns";

const EVENT_TYPES = ["Cleanup", "Plantation", "Donation", "Education", "Health", "Other"];

interface Props {
  event: Event;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditEventModal({ event, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnailURL: event.thumbnailURL || "",
    location: event.location,
    eventDate: format(new Date(event.eventDate), "yyyy-MM-dd"),
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const minDate = format(new Date(), "yyyy-MM-dd");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Event title is required.";
    if (!form.description.trim() || form.description.length < 20) e.description = "Description must be at least 20 characters.";
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
      await api.patch(`/events/${event._id}`, form);
      toast.success("Event updated successfully!");
      onSaved();
    } catch {
      toast.error("Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-base-200">
          <h2 className="text-xl font-bold">Edit Event</h2>
          <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
            <FiX size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Event Title *</span></label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`} />
            {errors.title && <p className="text-error text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Event Type</span></label>
            <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="select select-bordered w-full">
              {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Thumbnail URL</span></label>
            <input type="url" value={form.thumbnailURL} onChange={(e) => setForm({ ...form, thumbnailURL: e.target.value })} className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Location *</span></label>
            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={`input input-bordered w-full ${errors.location ? "input-error" : ""}`} />
            {errors.location && <p className="text-error text-xs mt-1">{errors.location}</p>}
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Event Date *</span></label>
            <input type="date" min={minDate} value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className={`input input-bordered w-full ${errors.eventDate ? "input-error" : ""}`} />
            {errors.eventDate && <p className="text-error text-xs mt-1">{errors.eventDate}</p>}
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Description *</span></label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`textarea textarea-bordered w-full resize-none ${errors.description ? "textarea-error" : ""}`} />
            {errors.description && <p className="text-error text-xs mt-1">{errors.description}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn bg-green-600 hover:bg-green-700 text-white flex-1 border-none">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
