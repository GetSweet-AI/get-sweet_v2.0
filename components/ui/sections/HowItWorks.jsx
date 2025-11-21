"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, GitBranch, UserCheck, PlayCircle } from "lucide-react";

const stepsData = [
  {
    icon: MessageSquare,
    step: "Step 01",
    title: "Define the Outcome",
    description:
      "Tell Sweet AI what outcome you want (strategy, PRDs, content, ads, listings, campaigns).",
  },
  {
    icon: GitBranch,
    step: "Step 02",
    title: "Activate Agentic Task Chains",
    description:
      "Sweet AI activates agentic task chains that plan → create → refine → prepare deliverables automatically.",
  },
  {
    icon: UserCheck,
    step: "Step 03",
    title: "Human Validation",
    description:
      "A human marketing specialist reviews, improves, and validates every step.",
  },
  {
    icon: PlayCircle,
    step: "Step 04",
    title: "System Execution & Continuous Optimization",
    description:
      "Your system executes — launching campaigns, updating content, generating variations, and optimizing performance continuously.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 90, damping: 14 },
  },
};

const GradientIcon = ({ Icon }) => (
  <div className="relative p-4 rounded-2xl shadow-md bg-white overflow-hidden w-fit group">
    <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
    <Icon className="relative z-10 w-8 h-8 text-white" strokeWidth={2.3} />
  </div>
);

const StepCard = ({ step, title, description, icon: Icon, isLast }) => (
  <motion.div className="flex mb-14 last:mb-0 relative" variants={stepVariants}>
    <div className="flex flex-col items-center mr-6 md:mr-10">
      <GradientIcon Icon={Icon} />

      {!isLast && (
        <div className="flex grow w-0.5 bg-linear-to-b from-purple-400 to-pink-400 opacity-60 mt-3 rounded-full" />
      )}
    </div>

    <div className="flex-1 pt-1">
      <span className="text-sm font-medium bg-purple-100 rounded-full py-1 px-3 text-purple-600">
        {step}
      </span>

      <h3 className="text-2xl mt-3 font-semibold text-gray-900 leading-snug">
        {title}
      </h3>

      <p className="text-gray-600 max-w-xl mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          How sweet AI works
        </motion.h2>

        <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
          A fully customized marketing system that executes tasks autonomously
          with human-in-the-loop oversight every step of the way.
        </p>

        <motion.div
          className="max-w-3xl mx-auto text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              isLast={index === stepsData.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
