"use client";
import React, { useEffect, useState } from "react";
import { Heart, Search, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// // Dummy data fallback
// const DUMMY_PROPERTIES = [
//   {
//     _id: "1",
//     title: "Luxury Residential Apartment",
//     category: "Residential",
//     features: ["gym", "parking"],
//     price: 5000000,
//     area: "Mumbai",
//     image: "/default-property.jpg",
//     propertyType: "Apartment",
//     propertyStatus: "Available",
//     description: "A beautiful luxury apartment in Mumbai.",
//     location: {
//       subLocality: "Bandra",
//       locality: "West",
//       city: "Mumbai",
//       state: "MH",
//     },
//     reviews: [],
//   },
//   {
//     _id: "2",
//     title: "Modern Gym Space",
//     category: "Commercial",
//     features: ["gym"],
//     price: 2000000,
//     area: "Delhi",
//     image: "/default-property.jpg",
//     propertyType: "Gym",
//     propertyStatus: "Available",
//     description: "Spacious gym space in Delhi.",
//     location: {
//       subLocality: "Saket",
//       locality: "South",
//       city: "Delhi",
//       state: "DL",
//     },
//     reviews: [],
//   },
//   {
//     _id: "3",
//     title: "Corporate Office Space",
//     category: "Office",
//     features: ["parking"],
//     price: 8000000,
//     area: "Bangalore",
//     image: "/default-property.jpg",
//     propertyType: "Office",
//     propertyStatus: "Available",
//     description: "Prime office space in Bangalore.",
//     location: {
//       subLocality: "MG Road",
//       locality: "Central",
//       city: "Bangalore",
//       state: "KA",
//     },
//     reviews: [],
//   },
//   {
//     _id: "4",
//     title: "Simple Residential Flat",
//     category: "Residential",
//     features: [],
//     price: 3000000,
//     area: "Pune",
//     image: "/default-property.jpg",
//     propertyType: "Flat",
//     propertyStatus: "Available",
//     description: "Affordable flat in Pune.",
//     location: {
//       subLocality: "Kothrud",
//       locality: "West",
//       city: "Pune",
//       state: "MH",
//     },
//     reviews: [],
//   },
// ];

const SortFilter = ({ onSortChange }) => {
  return (
    <Select onValueChange={onSortChange} defaultValue="default">
      <SelectTrigger className="w-[180px] bg-white border-gray-200 focus:border-teal-600 rounded-lg">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="price-asc">Price: High to Low </SelectItem>
        <SelectItem value="price-desc">Price: Low to High</SelectItem>
      </SelectContent>
    </Select>
  );
};

const MainCard = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState({});
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const feature = searchParams.get("feature");

  // Fetch user ID and wishlist data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) return;

      try {
        const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
          headers: { Authorization: token },
        });
        const fetchedUserId = userResponse.data.user._id;
        setUserId(fetchedUserId);

        const wishlistResponse = await axios.get(
          `${BACKEND_URL}/wishlist/get-wishlist/${fetchedUserId}`,
          { headers: { Authorization: token } }
        );
        const wishlistProperties =
          wishlistResponse.data.wishlistsData?.map((item) => item._id) || [];
        setWishlist(wishlistProperties);
      } catch (error) {
        console.error("Error fetching user or wishlist data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch properties (API or dummy fallback)
  useEffect(() => {
    const fetchPropertyData = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      try {
        setLoading(true);
        if (token) {
          const response = await axios.get(
            `${BACKEND_URL}/properties/availableProperty?${new URLSearchParams(
              searchParams
            ).toString()}`,
            { headers: { Authorization: token } }
          );
          const properties = response.data.properties || [];
          setPropertyData(properties.length ? properties : DUMMY_PROPERTIES);
          console.log(response);
        } else {
          setPropertyData(DUMMY_PROPERTIES);
        }
      } catch (error) {
        setPropertyData(DUMMY_PROPERTIES);
      } finally {
        setLoading(false);
      }
    };
   
    
    fetchPropertyData();
  }, [searchParams]);

  // Filter by feature (gym, office, residential)
  useEffect(() => {
    let filtered = propertyData;
    if (feature === "gym") {
      filtered = propertyData.filter((p) => (p.features || []).includes("gym"));
    } else if (feature === "office") {
      filtered = propertyData.filter((p) => p.category === "Office");
    } else if (feature === "residential") {
      filtered = propertyData.filter((p) => p.category === "Residential");
    }
    setFilteredProperties(filtered);
  }, [propertyData, feature]);

  // Search and sort
  useEffect(() => {
    let filtered = filteredProperties;
    if (searchTerm) {
      filtered = filtered.filter((property) => {
        const doc = property._doc || property;
        const name = doc.title?.toLowerCase() || "";
        const description = doc.description?.toLowerCase() || "";
        const category = doc.category?.toLowerCase() || "";
        const propertyType = doc.propertyType?.toLowerCase() || "";
        const propertyStatus = doc.propertyStatus?.toLowerCase() || "";
        const location = getFullAddress(doc.location || {}).toLowerCase();

        return (
          name.includes(searchTerm) ||
          description.includes(searchTerm) ||
          category.includes(searchTerm) ||
          propertyType.includes(searchTerm) ||
          propertyStatus.includes(searchTerm) ||
          location.includes(searchTerm)
        );
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      const getPrice = (property) => {
        const doc = property._doc || property;
        return (
          doc?.pricing?.price?.amount ||
          doc?.pricing?.expectedPrice ||
          doc?.pricing?.monthlyRent ||
          doc?.price ||
          0
        );
      };

      const priceA = getPrice(a);
      const priceB = getPrice(b);

      if (sortOption === "price-asc") return priceA - priceB;
      if (sortOption === "price-desc") return priceB - priceA;
      return 0;
    });

    setFilteredProperties(sorted);
    // eslint-disable-next-line
  }, [searchTerm, sortOption]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const getFullAddress = (location) =>
    [
      location?.houseNumber,
      location?.apartment,
      location?.subLocality,
      location?.locality,
      location?.city,
      location?.state,
    ]
      .filter(Boolean)
      .join(", ");

  const getAverageRating = (reviews) =>
    Array.isArray(reviews) && reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / reviews.length
        ).toFixed(1)
      : null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  // Wishlist toggle
  const handleWishlistToggle = async (propertyId) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please log in to manage your wishlist",
        variant: "destructive",
      });
      return;
    }

    setWishlistLoading((prev) => ({ ...prev, [propertyId]: true }));
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    const isInWishlist = wishlist.includes(propertyId);

    try {
      if (isInWishlist) {
        const response = await axios.delete(
          `${BACKEND_URL}/wishlist/remove/${propertyId}`,
          { headers: { Authorization: token } }
        );
        if (response.status === 200) {
          setWishlist(wishlist.filter((id) => id !== propertyId));
          toast({
            title: "Success",
            description: "Property removed from wishlist",
            variant: "success",
          });
        }
      } else {
        await axios.post(
          `${BACKEND_URL}/wishlist/add-wishlist`,
          { userId, propertyIds: [propertyId] },
          { headers: { Authorization: token } }
        );
        setWishlist([...wishlist, propertyId]);
        toast({
          title: "Success",
          description: "Property added to wishlist",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isInWishlist ? "remove from" : "add to"} wishlist`,
        variant: "destructive",
      });
    } finally {
      setWishlistLoading((prev) => ({ ...prev, [propertyId]: false }));
    }
  };

  return (
    <section className="flex-1 p-4 sm:p-6 max-w-full bg-gray-50">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-6xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 w-full bg-white border-gray-200 focus:border-teal-600 rounded-lg py-2 transition-all duration-200"
            placeholder="Search by area, city, name, category, or type"
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search properties"
          />
        </div>
        <SortFilter onSortChange={handleSortChange} />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 text-teal-600 animate-spin" />
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            {searchTerm
              ? `No properties found for "${searchTerm}". Try a different search term.`
              : "No properties available at the moment."}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredProperties.map((property) => {
              const doc = property._doc || property;
              const averageRating = getAverageRating(doc.reviews || []);
              return (
                <article
                  key={doc._id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-xl transition-all duration-300"
                  role="article"
                  aria-labelledby={`property-${doc._id}`}
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-72 h-48 sm:h-56 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={
                        doc.images?.[0].url ||
                        doc.image ||
                        "/default-property.jpg"
                      }
                      alt={doc.location?.subLocality || doc.title || "Property image"}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full transition-all duration-200"
                      onClick={() => handleWishlistToggle(doc._id)}
                      disabled={wishlistLoading[doc._id]}
                      aria-label={
                        wishlist.includes(doc._id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      {wishlistLoading[doc._id] ? (
                        <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
                      ) : (
                        <Heart
                          className={`h-5 w-5 transition-all duration-200 ${
                            wishlist.includes(doc._id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-500 hover:text-red-500"
                          }`}
                        />
                      )}
                    </Button>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between gap-3">
                        <div className="flex-1">
                          <h3
                            id={`property-${doc._id}`}
                            className="text-lg sm:text-xl font-semibold text-gray-900 truncate"
                          >
                            {doc.title ||
                              doc.location?.subLocality ||
                              "Property"}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                            {getFullAddress(doc.location || {})}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {averageRating ? (
                            <>
                              <div className="flex">{renderStars(averageRating)}</div>
                              <span className="text-xs sm:text-sm font-medium text-gray-700">
                                {averageRating} ({(doc.reviews || []).length})
                              </span>
                            </>
                          ) : (
                            <span className="text-xs sm:text-sm text-gray-500">
                              No Reviews
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full capitalize">
                          {doc.category || "Unknown"}
                        </span>
                        <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full capitalize">
                          {doc.propertyType || "Unknown"}
                        </span>
                        {(doc.features || []).map((feat) => (
                          <span
                            key={feat}
                            className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full capitalize"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 line-clamp-2">
                        {doc.description ||
                          "No description available for this property."}
                      </p>

                      <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-4">
                        <div>
                          <p className="text-base sm:text-lg font-semibold text-gray-900">
                            {doc?.pricing?.price?.amount
                              ? `₹${doc.pricing.price.amount.toLocaleString(
                                  "en-IN"
                                )}`
                              : doc?.pricing?.expectedPrice
                              ? `₹${doc.pricing.expectedPrice.toLocaleString(
                                  "en-IN"
                                )}`
                              : doc?.pricing?.monthlyRent
                              ? `₹${doc.pricing.monthlyRent.toLocaleString(
                                  "en-IN"
                                )}/mo`
                              : doc?.pricing?.finalPrice
                              ? `₹${doc.pricing.finalPrice.toLocaleString(
                                  "en-IN"
                                )}`
                              : doc?.price
                              ? `₹${doc.price.toLocaleString("en-IN")}`
                              : "Price N/A"}
                          </p>
                          <p className="text-xs text-gray-500">Price</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full capitalize">
                        {doc.propertyStatus || "Unknown"}
                      </p>
                      <div className="flex gap-2">
                        <Link href={`/show-property/${doc._id}`}>
                          <Button
                            size="sm"
                            className="rounded-full bg-teal-600 hover:bg-teal-700 transition-colors px-4"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainCard;