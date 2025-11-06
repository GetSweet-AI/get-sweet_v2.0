"use client";
import React from "react";
import { motion } from "framer-motion";

const InfoCard = ({ icon: Icon, title, content, link, linkText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-white shadow-lg flex items-start space-x-4 border border-gray-100 py-10 mb-4 lg:mb-0 "
    >
   
      <div className="p-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      
      {/* Contenido */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-2">{content}</p>
        {link && (
          <a href={link} className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
            {linkText}
          </a>
        )}
      </div>
    </motion.div>
)};

export default InfoCard;
