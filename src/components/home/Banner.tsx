"use client";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700 to-emerald-500 z-0" />
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 -translate-y-1/3 translate-x-1/4 z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block badge badge-lg bg-white/20 text-white border-white/30 mb-6 text-sm">
            ðŸŒ Making a Difference Together
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Unite for a{" "}
            <span className="text-yellow-300">Better</span>{" "}
            Community
          </h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
            Join thousands of volunteers across the nation. Discover cleanup drives, plantation events, donation camps, and more â€” right in your neighborhood.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/events"
              className="btn bg-white text-green-700 hover:bg-green-50 font-bold border-none gap-2"
            >
              <FiCalendar size={18} />
              Browse Events
            </Link>
            <Link
              href="/register"
              className="btn btn-outline text-white hover:bg-white hover:text-green-700 border-white font-bold gap-2"
            >
              Get Started
              <FiArrowRight size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { value: "2,400+", label: "Events" },
              { value: "18K+", label: "Volunteers" },
              { value: "120+", label: "Cities" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="hidden md:grid grid-cols-2 gap-3">
          {[
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1593113630400-ea4288922559?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=200&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden shadow-xl ${i === 1 || i === 2 ? "translate-y-4" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Community event" className="w-full h-40 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-base-100">
          <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
