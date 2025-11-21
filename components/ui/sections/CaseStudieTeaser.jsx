"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const teaserCases = [
  {
    title: "A Picture’s Worth a 1,000-Word Prompt",
    description:
      "Sweet AI built an agentic visual-to-prompt system that creates production-ready visuals from sketches or screenshots.",
  },
  {
    title: "Scalable Amazon Listing Content for Targus",
    description:
      "An agentic content engine generates localized scripts, listings, and videos at scale, routed through human QA.",
  },
  {
    title: "100% Automated Social Channels",
    description:
      "End-to-end automation: post ideas, visuals, copy, optimization, scheduling, with human review for brand fit.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CaseStudiesTeaser() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Official Sweet AI Case Studies
        </motion.h2>

        {/* Slider horizontal */}
        <motion.div
          className="flex space-x-6 overflow-x-auto scrollbar-hide py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {teaserCases.map((caseItem, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex-shrink-0 hover:shadow-2xl transition-shadow duration-300"
              variants={cardVariants}
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {caseItem.title}
              </h3>
              <p className="text-gray-700 text-sm">{caseItem.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <a
            href="/case-studies"
            className="inline-flex items-center text-purple-700 font-semibold hover:underline"
          >
            View All Case Studies <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
