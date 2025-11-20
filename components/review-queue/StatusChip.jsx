"use client";
import { Clock, Settings, CheckCircle, AlertTriangle } from "lucide-react";

const StatusChip = ({ status }) => {
  let colorClass = "";
  let icon = null;
  let label = status;

  switch (status) {
    case "pending":
      colorClass = "bg-orange-100 text-orange-700 border-orange-300";
      icon = <Clock className="w-3 h-3 mr-1" />;
      break;
    case "in progress":
      colorClass = "bg-blue-100 text-blue-700 border-blue-300";
      icon = <Settings className="w-3 h-3 mr-1 animate-spin-slow" />;
      break;
    case "completed":
      colorClass = "bg-green-100 text-green-700 border-green-300";
      icon = <CheckCircle className="w-3 h-3 mr-1" />;
      break;
    default:
      colorClass = "bg-gray-100 text-gray-500 border-gray-300";
      icon = <AlertTriangle className="w-3 h-3 mr-1" />;
  }

  return (
    <span
      className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}
    >
      {icon}
      {label}
    </span>
  );
};

export default StatusChip;
