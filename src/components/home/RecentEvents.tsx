"use client";
import { useEffect, useState } from "react";
import EventCard, { Event } from "@/components/EventCard";
import EventCardSkeleton from "@/components/EventCardSkeleton";
import Link from "next/link";
import api from "@/lib/api";

export default function RecentEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/events?limit=6&sort=date")
      .then((res) => setEvents(res.data?.events || res.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-green-600 font-semibold uppercase tracking-widest text-sm mb-3">
          Recent
        </p>
        <h2 className="section-title">Upcoming Events Near You</h2>
        <p className="section-subtitle">
          Join these upcoming community events and be the change you wish to see.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
            : events.length > 0
            ? events.map((e) => <EventCard key={e._id} event={e} />)
            : (
              <div className="col-span-3 text-center py-16 text-base-content/50">
                <div className="text-6xl mb-4">ðŸ“…</div>
                <p className="text-lg font-medium">No upcoming events yet.</p>
                <p className="text-sm">Be the first to create one!</p>
              </div>
            )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="btn bg-green-600 hover:bg-green-700 text-white border-none px-8"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
