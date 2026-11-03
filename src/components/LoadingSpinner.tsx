export default function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "loading-sm" : size === "lg" ? "loading-lg" : "loading-md";
  return (
    <div className="flex justify-center items-center py-12">
      <span className={`loading loading-spinner text-green-600 ${sizeClass}`}></span>
    </div>
  );
}
