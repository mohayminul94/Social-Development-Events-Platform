"use client";
import { useEffect, useState } from "react";
import EventCard, { Event } from "@/components/EventCard";
import EventCardSkeleton from "@/components/EventCardSkeleton";
import api from "@/lib/api";
import { FiSearch, FiFilter } from "react-icons/fi";

const EVENT_TYPES = ["All", "Cleanup", "Plantation", "Donation", "Education", "Health", "Other"];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filtered, setFiltered] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        const data = res.data?.events || res.data || [];
        setEvents(data);
        setFiltered(data);
      })
      .catch(() => {
        setEvents([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = events;
    if (typeFilter !== "All") {
      result = result.filter((e) => e.eventType === typeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, typeFilter, events]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Events</h1>
        <p className="text-base-content/60">
          Discover and join community events making a real difference.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
          <input
            type="text"
            placeholder="Search by title, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-9"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={16} />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="select select-bordered pl-9 pr-8"
          >
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => <EventCard key={e._id} event={e} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">ðŸ“­</div>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-base-content/60">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
