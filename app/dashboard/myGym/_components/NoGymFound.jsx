"use client";

import React from "react";
import { motion } from "framer-motion";

const NoGymFound = () => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-md p-6 max-w-sm mx-auto flex flex-col items-center text-center"
        >
            {/* Car Icon */}
            <div className="mb-4">
                <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 17H5a2 2 0 01-2-2V9a2 2 0 012-2h1m12 10h3a2 2 0 002-2V9a2 2 0 00-2-2h-1M6 7l1-3h10l1 3M6 12h12M9 16a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                    />
                </svg>
            </div>

            {/* Message */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Gym Found
            </h3>
            <p className="text-gray-600 text-sm mb-6">
                Add a new gym to get started.
            </p>


        </motion.div>
    );
};

export default NoGymFound;
