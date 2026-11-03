"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import api from "@/lib/api";
import { Event } from "@/components/EventCard";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiCalendar, FiMapPin } from "react-icons/fi";
import { format } from "date-fns";
import LoadingSpinner from "@/components/LoadingSpinner";
import EditEventModal from "@/components/EditEventModal";

function ManageEventsContent() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const fetchEvents = () => {
    if (!user) return;
    api
      .get(`/events?email=${user.email}`)
      .then((res) => setEvents(res.data?.events || res.data || []))
      .catch(() => toast.error("Failed to load your events."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (id: string) => {
    const result = await import("sweetalert2").then((Swal) =>
      Swal.default.fire({
        title: "Delete this event?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it",
      })
    );
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted successfully.");
    } catch {
      toast.error("Failed to delete event.");
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage My Events</h1>
        <p className="text-base-content/60">
          View, edit, or delete events you have created.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">ðŸ“‹</div>
          <h3 className="text-xl font-semibold mb-2">No events created yet</h3>
          <p className="text-base-content/60 mb-4">Start by creating your first community event!</p>
          <a href="/create-event" className="btn bg-green-600 text-white border-none">Create Event</a>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-32 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={event.thumbnailURL || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>
                      <span className="badge badge-sm badge-outline mt-1">{event.eventType}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingEvent(event)}
                        className="btn btn-sm bg-blue-50 hover:bg-blue-100 text-blue-600 border-none gap-1"
                      >
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="btn btn-sm bg-red-50 hover:bg-red-100 text-red-600 border-none gap-1"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-base-content/60">
                    <span className="flex items-center gap-1">
                      <FiMapPin size={13} className="text-green-600" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar size={13} className="text-green-600" />
                      {format(new Date(event.eventDate), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSaved={() => {
            setEditingEvent(null);
            fetchEvents();
          }}
        />
      )}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEventsContent />
    </PrivateRoute>
  );
}
