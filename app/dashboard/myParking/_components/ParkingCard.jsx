"use client";

import React from "react";
import { motion } from "framer-motion";
import BACKEND_URL from "@/lib/BACKEND_URL";

const ParkingCard = ({ parking, onDelete }) => {
    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete parking spot ${parking.spotNumber}?`)) return;

        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("accessToken")?.replace(/^"|"$/g, "") : null;
            if (!token) {
                alert("Authentication token is missing. Please log in.");
                return;
            }

            const res = await fetch(`${BACKEND_URL}/Parking/delete/${parking._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            onDelete();
        } catch (err) {
            alert("Failed to delete parking. Please try again later.");
        }
    };

    const amenities = [];
    if (parking.amenitiesDetails.securityCameras) amenities.push("Security Cameras");
    if (parking.amenitiesDetails.evCharging) amenities.push("EV Charging");
    if (parking.amenitiesDetails.coveredParking) amenities.push("Covered Parking");
    if (parking.amenitiesDetails.securityGuard) amenities.push("Security Guard");
    if (parking.amenitiesDetails.valetService) amenities.push("Valet Service");

    const accessibility = [];
    if (parking.accessibility.wheelchairAccessible) accessibility.push("Wheelchair Accessible");
    if (parking.accessibility.nearEntrance) accessibility.push("Near Entrance");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full max-w-sm min-h-[400px] flex flex-col"
        >
            {/* Image or Placeholder */}
            {parking.images && parking.images.length > 0 ? (
                <img
                    src={parking.images[0]}
                    alt={parking.spotNumber}
                    className="w-full h-40 object-cover rounded-t-2xl"
                />
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                    <span className="text-gray-500 text-sm">No Image Available</span>
                </div>
            )}

            {/* Card Content */}
            <div className="p-4 space-y-2 flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{parking.spotNumber}</h3>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${parking.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {parking.isAvailable ? "Available" : "Occupied"}
                    </span>
                </div>
                <p className="text-gray-600 text-sm">
                    {parking.locality}, {parking.city}, {parking.state}
                </p>
                <div className="flex justify-between text-sm text-gray-700">
                    <span className="capitalize">Type: {parking.type}</span>
                    <span>Size: {parking.size}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                    ${parking.hourlyRate.toFixed(2)}/hr
                </p>

                {/* Amenities */}
                {amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {amenities.map((amenity, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {amenity}
                            </span>
                        ))}
                    </div>
                )}

                {/* Accessibility */}
                {accessibility.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {accessibility.map((feature, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Button */}
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

export default ParkingCard;