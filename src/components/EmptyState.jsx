export default function EmptyState({
  icon = "📭",
  message = "Nothing here yet.",
  sub = "",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2">
      <span className="text-4xl">{icon}</span>
      <p className="text-gray-500 font-medium text-sm">{message}</p>
      {sub && <p className="text-gray-400 text-xs">{sub}</p>}
    </div>
  );
}
