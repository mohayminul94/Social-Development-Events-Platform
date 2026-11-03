# 🌱 CommUnity — Social Development Events Platform

**Live Site URL:** [https://social-development-events-platform.vercel.app](https://social-development-events-platform.vercel.app)  
**Repository:** [https://github.com/mohayminul94/Social-Development-Events-Platform.git](https://github.com/mohayminul94/Social-Development-Events-Platform.git)

---

## 🌟 About the Project

**CommUnity** is a modern social development and community-service events platform designed to connect active volunteers, civic organizations, and passionate changemakers. Whether organizing neighborhood cleanups, massive tree plantation drives, disaster relief supply donations, or community tutoring, CommUnity provides seamless event discovery, one-click RSVP, and complete self-service event management.

---

## 🚀 Key Features

- **Dynamic Event Discovery & Search:** Browse verified upcoming community events with live search by title, location, or cause, plus category filtering (Cleanup, Plantation, Donation, Education, Healthcare).
- **Interactive Event Details & RSVP:** View comprehensive event agendas, organizer contact cards, and attendee lists with immediate one-click "Join Event" capability.
- **Secure Authentication & Session Persistence:** Robust email and password registration and login backed by JWT token security, automatic token refresh, and persistent session state that preserves protected routes on browser reload.
- **Full-Featured Organizer Dashboard (Manage Events):** Creators can monitor, edit, and delete their own events with SweetAlert2 confirmation dialogs and comprehensive form validation (preventing past event dates).
- **Joined Events & Volunteer Tracking:** Volunteers can track all registered initiatives in chronological order to never miss a community engagement.
- **Full-System Dark & Light Theme:** Smooth, accessible theme toggling that switches DaisyUI and TailwindCSS modes across the entire site and remembers user preference.
- **Rich User Experience & Responsive Design:** Polished skeleton loaders during asynchronous data fetching, informative toast notifications (no native `alert()` popups), responsive navigation with profile dropdown, and modern iconography (including modern X branding).

---

## 🛠️ Tech Stack

### Client Side (Frontend)
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling & UI:** TailwindCSS v4, DaisyUI 5, React Icons
- **Notifications & Dialogs:** React Hot Toast, SweetAlert2
- **State & Theme:** React Context API (AuthContext, ThemeContext)
- **HTTP Client:** Axios with JWT request & response interceptors

### Server Side (Backend)
- **Runtime:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Security:** JSON Web Tokens (JWT), Bcrypt password hashing, CORS

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with Auth & Theme providers + Toast container
│   ├── globals.css        # TailwindCSS & DaisyUI configuration
│   ├── page.tsx           # Home landing page
│   ├── events/
│   │   ├── page.tsx       # Upcoming Events catalog (search & category filters)
│   │   └── [id]/page.tsx  # Dynamic Event Details & Join Event
│   ├── create-event/      # Create Event page (protected route)
│   ├── manage-events/     # Manage & Delete Creator Events (protected route)
│   ├── joined-events/     # User Joined Events (protected route)
│   ├── profile/           # User Profile View & Update (optional feature)
│   ├── login/             # Login with validation
│   ├── register/          # Registration with password complexity checks
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 Not Found page
├── components/
│   ├── Navbar.tsx         # Responsive navbar with user profile dropdown
│   ├── Footer.tsx         # Site footer with modern branding
│   ├── EventCard.tsx      # Event card component
│   ├── EventCardSkeleton.tsx # Loading skeleton
│   ├── LoadingSpinner.tsx # Global loading spinner
│   ├── EditEventModal.tsx # Modal for editing events
│   ├── PrivateRoute.tsx   # Auth guard for protected routes
│   └── home/
│       ├── Banner.tsx     # Hero banner
│       ├── Features.tsx   # Platform highlights
│       ├── RecentEvents.tsx # Latest 6 events showcase
│       ├── Gallery.tsx    # Volunteer impact photo gallery
│       └── Newsletter.tsx # Community newsletter signup
├── context/
│   ├── AuthContext.tsx    # User session, JWT tokens, login/logout
│   └── ThemeContext.tsx   # Dark/light theme persistence
└── lib/
    ├── api.ts             # Axios instance with auth headers
    └── auth.ts            # Token storage utilities
```

---

## 🏃 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/mohayminul94/Social-Development-Events-Platform.git
cd Social-Development-Events-Platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://social-development-events-platform-api.onrender.com/api
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🚢 Deployment

The frontend is ready for continuous deployment on **Vercel**:
1. Connect this GitHub repository (`mohayminul94/Social-Development-Events-Platform`) to Vercel.
2. Set Root Directory to `./` (or client directory if monorepo).
3. Set the Environment Variable `NEXT_PUBLIC_API_URL` to your backend URL.
4. Deploy!
