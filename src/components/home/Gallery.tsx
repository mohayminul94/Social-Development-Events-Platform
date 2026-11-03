const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
    alt: "Beach Cleanup",
    label: "Beach Cleanup",
  },
  {
    src: "https://images.unsplash.com/photo-1593113630400-ea4288922559?w=600",
    alt: "Food Drive",
    label: "Food Donation Drive",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600",
    alt: "Plantation",
    label: "Tree Plantation",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
    alt: "Charity",
    label: "Charity Event",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600",
    alt: "Volunteers",
    label: "Volunteer Rally",
  },
  {
    src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600",
    alt: "Education",
    label: "Education Camp",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-green-600 font-semibold uppercase tracking-widest text-sm mb-3">
          Gallery
        </p>
        <h2 className="section-title">Community in Action</h2>
        <p className="section-subtitle">
          Real moments from real changemakers â€” powering communities across the nation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.alt}
              className="relative group overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-xl transition-shadow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
