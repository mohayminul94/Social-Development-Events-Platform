import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiCalendar, FiTag } from "react-icons/fi";
import { format } from "date-fns";

export interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnailURL: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  joinCount?: number;
}

const typeColors: Record<string, string> = {
  Cleanup: "badge-success",
  Plantation: "badge-accent",
  Donation: "badge-warning",
  Education: "badge-info",
  Health: "badge-error",
  Other: "badge-neutral",
};

export default function EventCard({ event }: { event: Event }) {
  const badgeClass = typeColors[event.eventType] || "badge-neutral";

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 border border-base-200 flex flex-col h-full">
      <figure className="relative h-48 overflow-hidden">
        <Image
          src={event.thumbnailURL || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600"}
          alt={event.title}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600";
          }}
        />
        <div className="absolute top-3 right-3">
          <span className={`badge ${badgeClass} font-medium text-xs`}>
            {event.eventType}
          </span>
        </div>
      </figure>
      <div className="card-body flex flex-col flex-1 p-4">
        <h2 className="card-title text-base font-bold line-clamp-2 leading-snug">
          {event.title}
        </h2>
        <p className="text-sm text-base-content/60 line-clamp-2 flex-1 mt-1">
          {event.description}
        </p>
        <div className="mt-3 space-y-1.5 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <FiMapPin size={14} className="text-green-600 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar size={14} className="text-green-600 flex-shrink-0" />
            <span>{format(new Date(event.eventDate), "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiTag size={14} className="text-green-600 flex-shrink-0" />
            <span>{event.eventType}</span>
          </div>
        </div>
        <div className="card-actions mt-4">
          <Link
            href={`/events/${event._id}`}
            className="btn bg-green-600 hover:bg-green-700 text-white btn-sm w-full border-none"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}
