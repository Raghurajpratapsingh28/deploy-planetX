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
const DUMMY_GYMS = [
  {
    bookingDetails: {
      operationHours: "",
      membershipOption: "",
    },
    pricing: {
      baseMembershipPrice: 6000,
      discount: 300,
      taxes: 500,
      finalPrice: 6200,
    },
    _id: "684032125c0591e43f94d3de",
    userId: "68380c9c190009faa015e996",
    gymType: "Private",
    city: "gfdfdgfdgdf",
    state: "Assam",
    locality: "",
    subLocality: "",
    apartment: "",
    gymName: "sdfsadfasdfasdfasdfasdfas",
    gymDescription: "sdfasdfasdfasdfasdfasdfsdfasdfasdfasdfasdfsdafsadf",
    images: [
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/geometric-art-death-note-l-a0f50blxsyo5it28.jpg",
        _id: "684032125c0591e43f94d3df",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img1.jpeg",
        _id: "684032125c0591e43f94d3e0",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img2.jpeg",
        _id: "684032125c0591e43f94d3e1",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img3.jpeg",
        _id: "684032125c0591e43f94d3e2",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/sololeveling6816.jpg",
        _id: "684032125c0591e43f94d3e3",
      },
    ],
    video:
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/bhuvneshwar_kumar_ball_2_-_made_with_clipchamp.mp4",
    capacity: 54545,
    equipmentType: "sdfsdfsadfasdfsdfsadf",
    membershipType: "dfdfdfasdfasdfasdfsadfsa",
    amenitites: [
      "gfdggfhgfhgsdfgsdfg",
      "sadfsadfsadfsadfaf",
      "dfasdfasdfsadfsadfas",
    ],
    availableStatus: "Available",
    ageOfGym: 20,
    gymEquipment: [],
    facilities: [],
    trainerServices: [
      "fsdfsadfsadfasfsadfasdf",
      "asdfsadfasdfasfasdfadsfsdafds",
      "sdfsdfsadfasfsad",
    ],
    rules: ["sdfsdfsadfasfs", "fsadfasdfsaf"],
    additionalFeatures: ["fsdfsdafasfasf"],
    __v: 0,
  },
  {
    bookingDetails: {
      operationHours: "",
      membershipOption: "",
    },
    pricing: {
      baseMembershipPrice: 5000,
      discount: 300,
      taxes: 200,
      finalPrice: 4900,
    },
    _id: "684032885c0591e43f94d3f8",
    userId: "68380c9c190009faa015e996",
    gymType: "Celebrity",
    city: "sdfsdfsdfsdafsad",
    state: "Uttar Pradesh",
    locality: "",
    subLocality: "",
    apartment: "",
    gymName: "fghgfhfghfghgfhgfgfhgfhgfhgfhfgh",
    gymDescription: "hgfhgfhfhtrtrgregrhtrjuyujyutytuj",
    images: [
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/geometric-art-death-note-l-a0f50blxsyo5it28.jpg",
        _id: "684032885c0591e43f94d3f9",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img1.jpeg",
        _id: "684032885c0591e43f94d3fa",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img2.jpeg",
        _id: "684032885c0591e43f94d3fb",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/img3.jpeg",
        _id: "684032885c0591e43f94d3fc",
      },
      {
        name: "image",
        url: "https://planet-x-backend.s3.ap-south-1.amazonaws.com/sololeveling6816.jpg",
        _id: "684032885c0591e43f94d3fd",
      },
    ],
    video:
      "https://planet-x-backend.s3.ap-south-1.amazonaws.com/bhuvneshwar_kumar_ball_2_-_made_with_clipchamp.mp4",
    capacity: 250,
    equipmentType: "fghgfhfghgfhfh",
    membershipType: "gfhgfhgfhfghf",
    amenitites: [
      "dfdsfsdfsdafsdafsadfsaf",
      "sdfsdfsdafsadfsadf",
      "fsdfsdafafsadfsadfaf",
      "fdsfsdafsadfsafsaf",
    ],
    availableStatus: "Available",
    ageOfGym: 2,
    gymEquipment: ["fsdfgfhgfhjgfgjgfjgf", "fdsfasdfasdfasdfsaf"],
    facilities: ["fsdfsadfsdafasdfsadfasdfadf", "sdfsadfasdfsdfasf"],
    trainerServices: ["sadfsdfsdfsdfsadfsadf", "sdfasdfasdfasdfasdfsfs"],
    rules: [],
    additionalFeatures: ["sdfsdfsdfasdf", "sdfsdafsadf"],
    __v: 0,
  },
];

export default function GymDetailsPage() {
  const [parking, setParking] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const process = async () => {
      const token = getToken();
      const res = await axios.get(`${BACKEND_URL}/gym/`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data.gyms);
      setParking(res.data.gyms)
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
            {parking.map((spot) => (
              <GymEntry key={spot._id} spot={spot} />
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

function GymEntry({ spot }) {
  return (
    <article className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full sm:w-72 h-48 sm:h-56 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={spot.images?.[0].url || "/default-parking.jpg"}
          alt={`Parking spot ${spot.gymName}`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Gym {spot.gymName}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {getAddressFromSpot(spot) || "Location unknown"}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full capitalize">
              {spot.gymType || "Unknown"}
            </span>
            <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full capitalize">
              Capacity: {spot.capacity || "Unknown"}
            </span>
            {spot.amenitites.map((amenity, idx) => (
              <span
                key={idx}
                className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full capitalize"
              >
                {amenity.replace(/_/g, " ")}
              </span>
            ))}
            {spot.trainerServices.map((amenity, idx) => (
              <span
                key={idx}
                className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full capitalize"
              >
                {amenity.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              spot.availableStatus === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {spot.availableStatus === "Available" ? "Active" : "Inactive"}
          </span>
          <Link href={`/gym/${spot._id}`}>
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
