import Link from "next/link";
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">ðŸŒ±</span>
              <span className="text-2xl font-bold text-green-600">CommUnity</span>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Connecting passionate volunteers with impactful community events for a better tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-green-600 transition-colors">Home</Link></li>
              <li><Link href="/events" className="hover:text-green-600 transition-colors">Upcoming Events</Link></li>
              <li><Link href="/create-event" className="hover:text-green-600 transition-colors">Create Event</Link></li>
              <li><Link href="/joined-events" className="hover:text-green-600 transition-colors">Joined Events</Link></li>
            </ul>
          </div>

          {/* Event Types */}
          <div>
            <h3 className="font-bold text-base mb-4 uppercase tracking-wide">Event Types</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-600 transition-colors cursor-default">ðŸ§¹ Cleanup Drives</li>
              <li className="hover:text-green-600 transition-colors cursor-default">ðŸŒ³ Plantation Events</li>
              <li className="hover:text-green-600 transition-colors cursor-default">â¤ï¸ Donation Camps</li>
              <li className="hover:text-green-600 transition-colors cursor-default">ðŸ“š Education Programs</li>
              <li className="hover:text-green-600 transition-colors cursor-default">ðŸ¥ Health Camps</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4 uppercase tracking-wide">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-green-100 hover:text-green-700">
                <FaXTwitter size={16} />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-green-100 hover:text-green-700">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-green-100 hover:text-green-700">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-green-100 hover:text-green-700">
                <FaLinkedin size={16} />
              </a>
            </div>
            <p className="text-sm text-base-content/70">hello@community.dev</p>
            <p className="text-sm text-base-content/70">+1 (555) 000-0000</p>
          </div>
        </div>

        <div className="border-t border-base-300 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-base-content/60">
            &copy; {new Date().getFullYear()} CommUnity. All rights reserved.
          </p>
          <p className="text-sm text-base-content/60">
            Built with ðŸ’š for a better world
          </p>
        </div>
      </div>
    </footer>
  );
}
