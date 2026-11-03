"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("You're subscribed! Welcome to the CommUnity newsletter. ðŸŽ‰");
      setEmail("");
      setSubmitting(false);
    }, 800);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span className="inline-block badge badge-lg bg-white/20 text-white border-white/30 mb-6">
          ðŸ“¬ Stay in the Loop
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get Event Updates in Your Inbox
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Subscribe to our newsletter and never miss an upcoming community event near you.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered flex-1 bg-white/10 text-white placeholder-white/60 border-white/30 focus:border-white"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn bg-white text-green-700 hover:bg-green-50 font-bold border-none gap-2"
          >
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <FiSend size={16} />
            )}
            Subscribe
          </button>
        </form>
        <p className="text-white/50 text-xs mt-4">
          No spam, unsubscribe anytime. Your privacy is protected.
        </p>
      </div>
    </section>
  );
}
