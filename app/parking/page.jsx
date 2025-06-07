"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Heart, Star, X } from "lucide-react";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { getToken } from "@/lib/BACKEND_URL";

// Dummy Parking Data based on your parking schema
const DUMMY_PARKING = [
  {
    amenitiesDetails: {
      securityGuard: true,
      securityCameras: false,
      evCharging: false,
      valetService: false,
      coveredParking: true,
    },
    accessibility: {
      wheelchairAccessible: false,
      nearEntrance: true,
    },
    coordinates: {
      latitude: 565,
      longitude: 200,
    },
    _id: "68403b569b428c3a3fe06c35",
    userId: "68314025fec97a34973ca6b3",
    spotNumber: "jhgjghjgfhjfghjgfhj",
    city: "dsfdsfsdafas",
    state: "Jharkhand",
    locality: "sdfsdafsadf",
    sublocality: "",
    areaNumber: "",
    type: "standard",
    isAvailable: true,
    hourlyRate: 5000,
    size: "medium",
    video:
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/bhuvneshwae_kumar_ball_1_-_made_with_clipchamp.mp4",
    images: [
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/geometric-art-death-note-l-a0f50blxsyo5it28.jpg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img1.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img2.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img3.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/sololeveling6816.jpg",
    ],
    createdAt: "2025-06-04T12:25:58.521Z",
    updatedAt: "2025-06-04T12:25:58.521Z",
    __v: 0,
    reviews: [],
    id: "68403b569b428c3a3fe06c35",
  },
  {
    amenitiesDetails: {
      securityGuard: true,
      securityCameras: false,
      evCharging: false,
      valetService: false,
      coveredParking: true,
    },
    accessibility: {
      wheelchairAccessible: false,
      nearEntrance: true,
    },
    coordinates: {
      latitude: 565,
      longitude: 200,
    },
    _id: "68403b599b428c3a3fe06c38",
    userId: "68314025fec97a34973ca6b3",
    spotNumber: "dfsdfsdfsdfsd",
    city: "dsfdsfsdafas",
    state: "Jharkhand",
    locality: "sdfsdafsadf",
    sublocality: "",
    areaNumber: "",
    type: "standard",
    isAvailable: true,
    hourlyRate: 5000,
    size: "medium",
    video:
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/bhuvneshwae_kumar_ball_1_-_made_with_clipchamp.mp4",
    images: [
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/geometric-art-death-note-l-a0f50blxsyo5it28.jpg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img1.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img2.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img3.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/sololeveling6816.jpg",
    ],
    createdAt: "2025-06-04T12:26:01.620Z",
    updatedAt: "2025-06-04T12:26:01.620Z",
    __v: 0,
    reviews: [],
    id: "68403b599b428c3a3fe06c38",
  },
  {
    amenitiesDetails: {
      securityGuard: true,
      securityCameras: false,
      evCharging: false,
      valetService: false,
      coveredParking: true,
    },
    accessibility: {
      wheelchairAccessible: false,
      nearEntrance: true,
    },
    coordinates: {
      latitude: 565,
      longitude: 200,
    },
    _id: "68403b5c9b428c3a3fe06c3b",
    userId: "68314025fec97a34973ca6b3",
    spotNumber: "gfhgfhgfghfgh",
    city: "dsfdsfsdafas",
    state: "Jharkhand",
    locality: "sdfsdafsadf",
    sublocality: "",
    areaNumber: "",
    type: "standard",
    isAvailable: true,
    hourlyRate: 5000,
    size: "medium",
    video:
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/bhuvneshwae_kumar_ball_1_-_made_with_clipchamp.mp4",
    images: [
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/geometric-art-death-note-l-a0f50blxsyo5it28.jpg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img1.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img2.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img3.jpeg",
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/sololeveling6816.jpg",
    ],
    createdAt: "2025-06-04T12:26:04.775Z",
    updatedAt: "2025-06-04T12:26:04.775Z",
    __v: 0,
    reviews: [],
    id: "68403b5c9b428c3a3fe06c3b",
  },
];

export default function ParkingDetailsPage() {
  const [parking, setParking] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const process = async () => {
      const token = getToken();
      const res = await axios.get(`${BACKEND_URL}/Parking/`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data.parkings);
      setParking(res.data.parkings);
    };
    process();
  }, []);

  return (
    <section className="flex-1 p-4 sm:p-6 max-w-full bg-gray-50">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-6xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search parking spots by location, type, or status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            aria-label="Search parking spots"
            className="pl-10 w-full bg-white border-gray-200 focus:border-teal-600 rounded-lg py-2 transition-all duration-200"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 text-teal-600 animate-spin" />
            <p className="mt-4 text-gray-600">Loading parking spots...</p>
          </div>
        ) : parking.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            {searchTerm
              ? `No parking spots found for "${searchTerm}". Try a different search term.`
              : "No parking spots available at the moment."}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {parking.map((spot, idx) => (
              <ParkingEntry key={idx} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function getAddressFromSpot(spot) {
  const apartment =
    spot.apartment === undefined || spot.apartment === ""
      ? ""
      : spot.apartment + ", ";
  const subLocality =
    spot.subLocality === undefined || spot.subLocality === ""
      ? ""
      : spot.subLocality + ", ";
  const locality =
    spot.locality === undefined || spot.locality === ""
      ? ""
      : spot.locality + ", ";
  const city =
    spot.city === undefined || spot.city === "" ? "" : spot.city + ", ";
  const state = spot.state === undefined || spot.state === "" ? "" : spot.state;
  return `${apartment}${subLocality}${locality}${city}${state}`;
}

function ParkingEntry({ spot }) {
  return (
    <article className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full sm:w-72 h-48 sm:h-56 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={spot.images?.[0] || "/default-parking.jpg"}
          alt={`Parking spot ${spot.spotNumber}`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Spot {spot.spotNumber}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {getAddressFromSpot(spot) || "Location unknown"}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full capitalize">
              {spot.type || "Unknown"}
            </span>
            <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full capitalize">
              Size: {spot.size || "Unknown"}
            </span>
            {Object.keys(spot.amenitiesDetails).map((key, idx) =>
              spot.amenitiesDetails[key] ? (
                <span
                  key={idx}
                  className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full capitalize"
                >
                  {key}
                  {/* {amenity.replace(/_/g, " ")} */}
                </span>
              ) : (
                ""
              )
            )}
            {Object.keys(spot.accessibility).map((key, idx) =>
              spot.accessibility[key] ? (
                <span
                  key={idx}
                  className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full capitalize"
                >
                  {key}
                  {/* {amenity.replace(/_/g, " ")} */}
                </span>
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              spot.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {spot.isAvailable ? "Active" : "Inactive"}
          </span>
          <Link href={`/parking/${spot._id}`}>
            <Button
              size="sm"
              className="rounded-full bg-teal-600 hover:bg-teal-700 transition-colors px-4"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
