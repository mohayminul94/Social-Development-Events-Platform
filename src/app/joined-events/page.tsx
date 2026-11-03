"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import api from "@/lib/api";
import { Event } from "@/components/EventCard";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FiCalendar, FiMapPin, FiExternalLink } from "react-icons/fi";
import { format } from "date-fns";

function JoinedEventsContent() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .get(`/events/joined?email=${user.email}`)
      .then((res) => {
        // Sort by event date ascending
        const data = (res.data?.events || res.data || []).sort(
          (a: Event, b: Event) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
        setEvents(data);
      })
      .catch(() => toast.error("Failed to load joined events."))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Joined Events</h1>
        <p className="text-base-content/60">
          Events you have signed up for, sorted by date.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">ðŸ—“ï¸</div>
          <h3 className="text-xl font-semibold mb-2">No events joined yet</h3>
          <p className="text-base-content/60 mb-6">Explore upcoming events and start making a difference!</p>
          <Link href="/events" className="btn bg-green-600 text-white border-none">Browse Events</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const isPast = new Date(event.eventDate) < new Date();
            return (
              <div
                key={event._id}
                className={`card bg-base-100 border shadow-sm hover:shadow-md transition-shadow ${isPast ? "border-base-300 opacity-75" : "border-base-200"}`}
              >
                <div className="card-body p-4 flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-32 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={event.thumbnailURL || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {isPast && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold bg-black/60 px-2 py-0.5 rounded-full">Ended</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>
                        <span className="badge badge-sm badge-outline mt-1">{event.eventType}</span>
                      </div>
                      <Link
                        href={`/events/${event._id}`}
                        className="btn btn-sm btn-ghost gap-1 flex-shrink-0"
                      >
                        <FiExternalLink size={14} /> View
                      </Link>
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEventsContent />
    </PrivateRoute>
  );
}
