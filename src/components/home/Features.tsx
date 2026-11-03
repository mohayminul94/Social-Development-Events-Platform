import { FiSearch, FiUsers, FiCalendar, FiMapPin, FiShield, FiBell } from "react-icons/fi";

const features = [
  {
    icon: <FiSearch size={28} />,
    title: "Discover Events",
    desc: "Find upcoming community events near you â€” from beach cleanups to tree plantation drives.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: <FiCalendar size={28} />,
    title: "Create Events",
    desc: "Organizers can easily create and manage events with full details, dates, and locations.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Join & Volunteer",
    desc: "Register for events with a single click and be part of meaningful change in your community.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: <FiMapPin size={28} />,
    title: "Location-Based",
    desc: "Browse events by location and find opportunities in your city or neighborhood.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure Platform",
    desc: "JWT-authenticated, secure platform to keep your data safe and your events protected.",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: <FiBell size={28} />,
    title: "Track Participation",
    desc: "View all events you have joined and manage events you have created â€” all in one place.",
    color: "bg-teal-100 text-teal-700",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-green-600 font-semibold uppercase tracking-widest text-sm mb-3">
          Why CommUnity?
        </p>
        <h2 className="section-title">Everything You Need to Make an Impact</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          A powerful platform designed to connect communities, empower volunteers, and drive social change.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-base-content/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
