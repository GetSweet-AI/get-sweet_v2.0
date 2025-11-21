// Updated StatsSection with improved layout for value
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Cpu,
  Clock,
  TrendingUp,
  Filter,
  ChevronDown,
} from "lucide-react";

const statsData = [
  {
    icon: <DollarSign strokeWidth={2} />,
    value: "Up to 90%",
    title: "Cost savings",
    description: "Compared to agencies, freelancers, and internal teams.",
  },
  {
    icon: <Cpu strokeWidth={2} />,
    value: "Up to 85%",
    title: "Less manual workload",
    description: "Automation handles repetitive, multi-step marketing tasks.",
  },
  {
    icon: <Clock strokeWidth={2} />,
    value: "Up to 70%",
    title: "Faster turnaround",
    description: "From concept and strategy to live execution in record time.",
  },
  {
    icon: <TrendingUp strokeWidth={2} />,
    value: "Up to 60%",
    title: "Higher performance lift",
    description: "Continuous agentic testing drives measurable gains.",
  },
  {
    icon: <Filter strokeWidth={2} />,
    value: "Up to 50%",
    title: "Less wasted media",
    description: "Sharper targeting and reduced budgetary waste.",
  },
];

const StatAccordionCard = ({ stat, index, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className={`flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.33%-0.75rem)] lg:w-[calc(20%-0.5rem)]
        ${
          isOpen
            ? "bg-white text-purple-800 shadow-xl scale-[1.00]"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
    >
      <div className="flex flex-col items-center w-full select-none">
        <div
          className={`mb-3 p-3 rounded-xl transition-colors ${
            isOpen ? "bg-purple-600/10" : "bg-white/20"
          }`}
        >
          {React.cloneElement(stat.icon, {
            className: `w-8 h-8 ${isOpen ? "text-purple-600" : "text-white"}`,
          })}
        </div>

        <p className="text-3xl md:text-4xl font-bold mb-1 text-center whitespace-nowrap">
          {stat.value}
        </p>

        <h3 className="text-base font-semibold mb-2 text-center">
          {stat.title}
        </h3>

        <ChevronDown
          className={`w-5 h-5 mt-1 transition-transform ${
            isOpen ? "rotate-180 text-pink-500" : "text-gray-200"
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 pt-4 border-t border-white/30 w-full"
          >
            <p className="text-xs font-medium text-center px-2">
              {stat.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StatsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-linear-to-r from-purple-700 to-pink-600 py-20 rounded-4xl">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg font-semibold text-gray-100 mb-4 text-center"
        >
          Compared to agencies, freelancers, and internal teams:
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white mb-16 text-center max-w-4xl mx-auto"
        >
          Agentic processes + human oversight = the most efficient marketing
          workflow possible.
        </motion.h2>

        <div className="flex justify-center">
          <div className="flex flex-wrap xl:flex-nowrap justify-center gap-6 max-w-7xl">
            {statsData.map((stat, index) => (
              <StatAccordionCard
                key={index}
                stat={stat}
                index={index}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
