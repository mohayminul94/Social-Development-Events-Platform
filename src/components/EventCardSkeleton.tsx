export default function EventCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200">
      <div className="skeleton h-48 w-full rounded-t-2xl"></div>
      <div className="card-body p-4 space-y-3">
        <div className="skeleton h-5 w-3/4"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-3 w-1/2"></div>
        <div className="skeleton h-3 w-1/3"></div>
        <div className="skeleton h-8 w-full rounded-lg mt-2"></div>
      </div>
    </div>
  );
}
