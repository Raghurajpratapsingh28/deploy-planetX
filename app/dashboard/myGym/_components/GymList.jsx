"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useRouter } from "next/navigation";
import GymCard from "./GymCard";
import NoGymFound from "./NoGymFound";

const getToken = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
        return token || null;
    }
    return null;
};

const GymList = () => {
    const [gyms, setGyms] = useState([]);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();

    // Fetch token on client-side mount
    useEffect(() => {
        setToken(getToken());
    }, []);

    const fetchGyms = useCallback(async () => {
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            setGyms([]);
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/gym/user/gyms`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Response is not valid JSON");
            }

            const data = await res.json();
            setGyms(data.gyms || []);
            setError(null);
        } catch (err) {
            setError("Failed to load gyms. Please try again later.");
            setGyms([]);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchGyms();
        }
    }, [token, fetchGyms]);

    return (
        <div className="container mx-auto px-4 py-6 md:py-10 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Gym</h1>
                <motion.button
                    onClick={() => router.push("/dashboard/add-gym")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                    <span className="font-medium">Create New Gym</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                    </svg>
                </motion.button>
            </div>

            {error && (
                <div className="text-red-600 text-center p-4 bg-red-50 rounded-xl">
                    {error}
                </div>
            )}

            {gyms.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {gyms.map((gym) => (
                        <GymCard
                            key={gym._id}
                            gym={gym}
                            onDelete={fetchGyms}
                        // onUpdate={(gym) => setEditingGym(gym)}
                        />
                    ))}
                </div>
            ) : (
                !error && <NoGymFound />
            )}
        </div>
    );
};

export default GymList;