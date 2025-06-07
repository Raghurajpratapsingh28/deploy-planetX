"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import BACKEND_URL from "@/lib/BACKEND_URL";

const GymCard = ({ gym, onDelete }) => {
    const handleDelete = useCallback(async () => {
        if (!confirm("Are you sure you want to delete this gym?")) return;

        try {
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("accessToken")?.replace(/^"|"$/g, "")
                    : null;
            if (!token) {
                alert("Authentication token is missing. Please log in.");
                return;
            }

            const res = await fetch(`${BACKEND_URL}/gym/delete/${gym._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            if (!res.ok) {
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {

                    throw new Error("Response is not valid JSON");
                }

                const data = await res.json();
                throw new Error(data.error || "Failed to delete gym");
            }

            onDelete();
        } catch (err) {
            alert(err.message);
        }
    }, [gym._id, onDelete]);

    const imageUrl =
        gym.imageUrl ||
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full max-w-sm min-h-[400px] flex flex-col"
        >
            <div className="w-full h-40">
                <img
                    src={imageUrl}
                    alt={gym.gymName}
                    className="w-full h-full object-cover rounded-t-2xl hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4 space-y-2 flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{gym.gymName}</h3>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${gym.availableStatus === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {gym.availableStatus}
                    </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                    {gym.gymDescription}
                </p>
                <div className="space-y-1">
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold text-gray-900">Location:</span>{" "}
                        {gym.city}, {gym.state}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold text-gray-900">Capacity:</span>{" "}
                        {gym.capacity}
                    </p>
                </div>
            </div>
            <div className="p-4 flex justify-end">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-md transition-all duration-200"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                    Delete
                </motion.button>
            </div>
        </motion.div>
    );
};

export default GymCard;
