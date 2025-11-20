"use client";

import PriorityBadge from "./PriorityBagde";
import StatusChip from "./StatusChip";
import { Clock, UsersRound } from "lucide-react";

const TaskItem = ({ task, isActive, onClick }) => {
  const activeClass = isActive
    ? "border-purple-600 border-l-4 bg-gray-50"
    : "border-gray-200 border-l-4 hover:bg-gray-100";

  return (
    <div
      onClick={onClick}
      className={`relative p-5 shadow-lg rounded-xl mb-4 transition duration-300 cursor-pointer bg-white ${activeClass}`}
    >
      <PriorityBadge priority={task.priority} />

      <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{task.client}</p>

      <div className="flex items-center space-x-4 mt-2">
        <span className="flex items-center text-xs text-gray-600">
          <Clock className="w-3 h-3 mr-1 text-gray-400" />
          {task.date}
        </span>

        <StatusChip status={task.status} />

        {task.assigned && (
          <span className="flex items-center text-xs text-gray-600">
            <UsersRound className="w-3 h-3 mr-1 text-gray-400" />
            Assigned to {task.assigned}
          </span>
        )}
      </div>

      <p className="text-xs text-purple-600 mt-3 font-medium">AI Generated</p>
    </div>
  );
};

export default TaskItem;
