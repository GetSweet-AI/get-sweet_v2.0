"use client";

const PriorityBadge = ({ priority }) => {
  const colorClass =
    priority === "high"
      ? "bg-red-500 text-white"
      : priority === "medium"
      ? "bg-yellow-500 text-white"
      : "bg-blue-100 text-gray-600";

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-lg uppercase absolute top-4 right-4 ${colorClass}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
