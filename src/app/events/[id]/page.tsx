"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Event } from "@/components/EventCard";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FiMapPin, FiCalendar, FiTag, FiUser, FiUsers, FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";

export default function EventDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        setEvent(res.data?.event || res.data);
        if (user) {
          // Check if already joined
          api.get(`/events/${id}/join-status?email=${user.email}`)
            .then((r) => setJoined(r.data?.joined || false))
            .catch(() => {});
        }
      })
      .catch(() => toast.error("Failed to load event details."))
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please log in to join this event.");
      router.push("/login");
      return;
    }
    if (joined) {
      toast("You have already joined this event!", { icon: "â„¹ï¸" });
      return;
    }
    setJoining(true);
    try {
      await api.post(`/events/${id}/join`, { userEmail: user.email, userName: user.name });
      setJoined(true);
      toast.success("You have successfully joined this event! ðŸŽ‰");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to join event.";
      toast.error(msg);
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;
  if (!event) return (
    <div className="text-center py-24">
      <div className="text-6xl mb-4">ðŸ˜”</div>
      <h2 className="text-2xl font-bold">Event not found</h2>
      <button onClick={() => router.back()} className="btn bg-green-600 text-white mt-4 border-none">Go Back</button>
    </div>
  );

  const isPast = new Date(event.eventDate) < new Date();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={() => router.back()}
        className="btn btn-ghost btn-sm mb-6 gap-2"
      >
        <FiArrowLeft size={16} /> Back to Events
      </button>

      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
        <figure className="relative h-72 md:h-96">
          <Image
            src={event.thumbnailURL || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="badge badge-lg bg-green-600 text-white border-none">{event.eventType}</span>
            {isPast && <span className="badge badge-error badge-lg">Event Ended</span>}
          </div>
        </figure>

        <div className="card-body p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { icon: <FiMapPin className="text-green-600" />, label: "Location", value: event.location },
              { icon: <FiCalendar className="text-green-600" />, label: "Date", value: format(new Date(event.eventDate), "MMMM dd, yyyy") },
              { icon: <FiTag className="text-green-600" />, label: "Type", value: event.eventType },
              { icon: <FiUser className="text-green-600" />, label: "Organizer", value: event.creatorEmail },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-3 bg-base-200 rounded-xl">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <div className="text-xs text-base-content/50 mb-0.5">{item.label}</div>
                  <div className="font-medium text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="prose prose-sm max-w-none mb-6">
            <h3 className="font-bold text-base mb-2">About this Event</h3>
            <p className="text-base-content/70 leading-relaxed">{event.description}</p>
          </div>

          {event.joinCount !== undefined && (
            <div className="flex items-center gap-2 text-sm text-base-content/60 mb-4">
              <FiUsers className="text-green-600" />
              <span>{event.joinCount} people have joined</span>
            </div>
          )}

          {!isPast && (
            <button
              onClick={handleJoin}
              disabled={joining || joined}
              className={`btn w-full border-none ${
                joined
                  ? "btn-success text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {joining ? (
                <span className="loading loading-spinner loading-sm" />
              ) : joined ? (
                "âœ“ Joined"
              ) : (
                "Join This Event"
              )}
            </button>
          )}
          {isPast && (
            <div className="alert alert-warning text-sm">
              This event has already ended.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
