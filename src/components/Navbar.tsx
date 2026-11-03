"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = (
    <>
      <li>
        <Link href="/events" className="font-medium">
          Upcoming Events
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link href="/create-event">Create Event</Link>
          </li>
          <li>
            <Link href="/manage-events">Manage Events</Link>
          </li>
          <li>
            <Link href="/joined-events">Joined Events</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FiMenu size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 ml-1">
          <span className="text-2xl">ðŸŒ±</span>
          <span className="text-xl font-bold text-green-600 hidden sm:block">
            CommUnity
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.name}
            >
              <div className="w-9 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-1">
                <Image
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=16a34a&color=fff`
                  }
                  alt={user.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=16a34a&color=fff`;
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-200"
            >
              <li className="menu-title px-4 py-2 text-sm font-semibold">
                {user.name}
              </li>
              <li>
                <Link href="/profile">My Profile</Link>
              </li>
              <li>
                <Link href="/create-event">Create Event</Link>
              </li>
              <li>
                <Link href="/manage-events">Manage Events</Link>
              </li>
              <li>
                <Link href="/joined-events">Joined Events</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn bg-green-600 hover:bg-green-700 text-white btn-sm border-none">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
