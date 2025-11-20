"use client";

import React, { useState } from "react";
import TaskItem from "@/components/review-queue/TaskItem";
import TaskTabs from "@/components/review-queue/TaskTabs";
import { taskData } from "@/data/taskData";
import HeaderChat from "@/components/chat/ui/HeaderChat";

export default function ReviewQueuePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTask, setSelectedTask] = useState(taskData[0]?.id);

  const filteredTasks = taskData.filter((task) => {
    if (activeTab === "all") return true;
    return task.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-4 font-sans">
      <HeaderChat />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-14">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Review Queue</h1>
          <p className="text-gray-500 mt-1">Content awaiting human review</p>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="p-4 sm:p-6">
            {filteredTasks.length > 0 ? (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    isActive={task.id === selectedTask}
                    onClick={() => setSelectedTask(task.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-10 text-gray-500">
                No tasks found in &quot;{activeTab}&quot; status.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
