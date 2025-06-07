"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  MoreVertical,
  Phone,
  PhoneIcon as WhatsApp,
  X,
  Heart,
  Share2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import BACKEND_URL, { getToken } from "@/lib/BACKEND_URL";
import axios from "axios";

type Review = {
  _id: string;
  text: string;
  author: string;
  stars: number;
  createdAt: Date;
  user: { _id: string; name: string };
};

type Owner = {
  name: string;
  mobile: string;
  whatsappMobile: string;
};

type Parking = {
  _id: string;
  userId: string;
  spotNumber: string;
  location: string;
  type: string;
  isAvailable: boolean;
  hourlyRate: number;
  size: string;
  amenities: string[];
  images: string[];
  accessibility: { wheelchairAccessible: boolean; nearEntrance: boolean };
  coordinates: { latitude: number; longitude: number };
  createdAt: Date;
  updatedAt: Date;
  reviews: Review[];
  owner: Owner;
};

// Dummy Parking Data
const DUMMY_PARKING: Parking[] = [
  {
    _id: "68403b569b428c3a3fe06c35",
    userId: "user1",
    spotNumber: "A-101",
    location: "Building A, Floor 1",
    type: "standard",
    isAvailable: true,
    hourlyRate: 10,
    size: "medium",
    amenities: ["covered", "security_camera"],
    images: ["/parking1.jpg"],
    accessibility: { wheelchairAccessible: true, nearEntrance: false },
    coordinates: { latitude: 19.076, longitude: 72.8777 },
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [
      {
        _id: "r1",
        text: "Great spot, very convenient.",
        author: "Alice",
        stars: 4,
        createdAt: new Date(),
        user: { _id: "user1", name: "Alice" },
      },
      {
        _id: "r2",
        text: "Easy access and clean surroundings.",
        author: "Bob",
        stars: 5,
        createdAt: new Date(),
        user: { _id: "user2", name: "Bob" },
      },
    ],
    owner: {
      name: "Facility Manager",
      mobile: "+91 12345 67890",
      whatsappMobile: "+91 12345 67890",
    },
  },
  {
    _id: "2",
    userId: "user2",
    spotNumber: "B-205",
    location: "Building B, Floor 2",
    type: "electric",
    isAvailable: false,
    hourlyRate: 15,
    size: "compact",
    amenities: ["ev_charging", "covered"],
    images: ["/parking2.jpg"],
    accessibility: { wheelchairAccessible: false, nearEntrance: true },
    coordinates: { latitude: 28.7041, longitude: 77.1025 },
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [],
    owner: {
      name: "Facility Manager",
      mobile: "+91 98765 43210",
      whatsappMobile: "+91 98765 43210",
    },
  },
  {
    _id: "3",
    userId: "user3",
    spotNumber: "C-303",
    location: "Building C, Floor 3",
    type: "premium",
    isAvailable: true,
    hourlyRate: 20,
    size: "large",
    amenities: ["covered", "security_camera", "ev_charging"],
    images: ["/parking3.jpg"],
    accessibility: { wheelchairAccessible: true, nearEntrance: true },
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [
      {
        _id: "r3",
        text: "Spacious spot with premium facilities.",
        author: "Charlie",
        stars: 5,
        createdAt: new Date(),
        user: { _id: "user3", name: "Charlie" },
      },
    ],
    owner: {
      name: "Facility Manager",
      mobile: "+91 11223 44556",
      whatsappMobile: "+91 11223 44556",
    },
  },
];



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

export default function ParkingDetailsPage() {
  const { id } = useParams();
  const toast = useToast();
  const [parking, setParking] = useState({});
    const [activeTab, setActiveTab] = useState("about");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userId] = useState("dummyUser");
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    setLoading(true);
    const process = async () => {
      const token = getToken();
      const res = await axios.get(`${BACKEND_URL}/Parking/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      console.log(res.data.parking);
      setParking(res.data.parking);
      setReviews(res.data.parking.reviews);
      setLoading(false);
    };
    process();
  }, []);

    if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">
          loading
        </h2>
      </div>
    );
  }

  // Early return if parking not found.
  if (Object.keys(parking).length === 0 || parking === undefined) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Parking spot not found.
        </h2>
      </div>
    );
  }



  const nextImage = () => {
    if (parking.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === parking.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (parking.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? parking.images.length - 1 : prev - 1
      );
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleWishlistToggle = async () => {
    if (!userId) {
      toast.toast({
        title: "Error",
        description: "Please log in",
        variant: "destructive",
      });
      return;
    }
    setWishlistLoading(true);
    const isInWishlist = wishlist.includes(parking._id);
    if (isInWishlist) {
      setWishlist(wishlist.filter((id) => id !== parking._id));
      toast.toast({
        title: "Success",
        description: "Removed from wishlist",
        variant: "success",
      });
    } else {
      setWishlist([...wishlist, parking._id]);
      toast.toast({
        title: "Success",
        description: "Added to wishlist",
        variant: "success",
      });
    }
    setWishlistLoading(false);
  };

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/parking/${parking._id}`;
    const shareText = `Check out Parking Spot ${parking.spotNumber} at ${parking.location} for just $${parking.hourlyRate}/hr`;
    let url = "";
    if (platform === "whatsapp") {
      url = `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + shareUrl
      )}`;
    } else if (platform === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`;
    } else if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`;
    }
    window.open(url, "_blank");
    setShowShareOptions(false);
  };

  const handleSubmitNotification = async () => {
    if (!notificationTitle.trim() || !notificationText.trim()) {
      toast.toast({
        title: "Error",
        description: "Please fill title and message",
        variant: "destructive",
      });
      return;
    }
    toast.toast({
      title: "Success",
      description: "Notification sent",
      variant: "success",
    });
    setShowNotify(false);
    setNotificationTitle("");
    setNotificationText("");
  };

  const handleSubmitReview = async () => {
    if (!userRating || !reviewText.trim()) {
      toast.toast({
        title: "Error",
        description: "Please provide rating and review",
        variant: "destructive",
      });
      return;
    }
    const newReview: Review = {
      _id: Date.now().toString(),
      text: reviewText,
      author: "You",
      stars: userRating,
      createdAt: new Date(),
      user: { _id: userId, name: "You" },
    };
    setReviews([newReview, ...reviews]);
    toast.toast({
      title: "Success",
      description: "Review submitted",
      variant: "success",
    });
    setUserRating(0);
    setReviewText("");
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(parking.images[index]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Parking Details
            </h3>
            <p className="mb-3 text-gray-600">
              <span className="font-medium">Spot:</span> {parking.spotNumber}
            </p>
            <p className="mb-3 text-gray-600">
              <span className="font-medium">Location:</span>{" "}
              {getAddressFromSpot(parking)}
            </p>
            <p className="mb-3 text-gray-600">
              <span className="font-medium">Type:</span>{" "}
              {parking.type.charAt(0).toUpperCase() + parking.type.slice(1)}
            </p>
            <p className="mb-3 text-gray-600">
              <span className="font-medium">Hourly Rate:</span> $
              {parking.hourlyRate}
            </p>
            <p className="mb-3 text-gray-600">
              <span className="font-medium">Size:</span>{" "}
              {parking.size.charAt(0).toUpperCase() + parking.size.slice(1)}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["dfsdfsdf", "fsdfsadfad", "fsdfsdfsd"].map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </span>
              ))}
            </div>
          </div>
        );
      case "amenities":
        return (
          <div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Covered Parking:</span>{" "}
                    {parking.amenitiesDetails.coveredParking ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">
                    <span className="font-medium">
                      Electric Vehicle Charging:
                    </span>{" "}
                    {parking.amenitiesDetails.evCharging ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Security Cameras:</span>{" "}
                    {parking.amenitiesDetails.securityCameras ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Security Guard:</span>{" "}
                    {parking.amenitiesDetails.securityGuard ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Valet Service:</span>{" "}
                    {parking.amenitiesDetails.valetService ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Accessibility
              </h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Wheelchair Accessible:</span>{" "}
                    {parking.accessibility.wheelchairAccessible ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Near Entrance:</span>{" "}
                    {parking.accessibility.nearEntrance ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {parking.images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden group shadow-md cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-sm font-medium">
                      Image {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "review":
        return (
          <div className="py-6">
            <div className="bg-white rounded-xl p-6 shadow-md mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Write a Review
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= (hoverRating || userRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this parking spot..."
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 h-32 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                onClick={handleSubmitReview}
                disabled={!userRating || !reviewText.trim()}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium w-full ${
                  userRating && reviewText.trim()
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                <Send className="h-4 w-4" />
                Submit Review
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Reviews
            </h3>
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 border-2 border-white shadow-sm">
                        {(review.user?.name || "NA").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {review.user?.name || "Anonymous"}
                        </div>
                        <div className="flex items-center">
                          {renderStars(review.stars)}
                          <span className="ml-1 text-sm font-medium">
                            {review.stars}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {formatDistanceToNow(new Date(review.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      {review.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  type ModalProps = {
    image: string | null;
    onClose: () => void;
  };

  const ImageModal = ({ image, onClose }: ModalProps) => {
    if (!image) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
          <img
            src={image}
            alt="Enlarged view"
            className="max-h-full max-w-full object-contain rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    );
  };

  const ShareModal = () => {
    if (!showShareOptions) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-sm mx-4 shadow-xl">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Share Parking Spot
            </h3>
            <button
              onClick={() => setShowShareOptions(false)}
              className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-3">
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center gap-3 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              WhatsApp
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              Facebook
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-3 px-4 py-3 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              Twitter
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parking Details</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Parking Spot ({parking.type?.toUpperCase() || "N/A"})</span>
            <span className="mx-2">•</span>
            <span>{parking.isAvailable ? "Active" : "Inactive"}</span>
            <span className="mx-2">•</span>
            <Link
              href="#"
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              View
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
          {/* <div className="lg:col-span-2 space-y-6"> */}
          <div className="space-y-6">
            {/* Image Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {/* <div className="relative aspect-[16/9]"> */}
              <div className="relative aspect-[16/9] mx-auto flex items-center">
                <img
                  src={parking.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                  Image {currentImageIndex + 1}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoading}
                    className={`bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors ${
                      wishlistLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlist.includes(parking._id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => setShowShareOptions(true)}
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-indigo-500" />
                  </button>
                </div>
              </div>
              <div className="flex overflow-x-auto gap-2 p-4 bg-white">
                {parking.images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                      currentImageIndex === index
                        ? "border-indigo-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            {/* Details & Tabs */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Parking Spot {parking.spotNumber}
                  </h2>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                    <span className="text-sm">
                      {getAddressFromSpot(parking)}
                    </span>
                  </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${parking.hourlyRate}
                  </span>
                  <span className="text-sm text-gray-600">/hr</span>
                </div>
                <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {parking.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium">
                  {parking.type.charAt(0).toUpperCase() + parking.type.slice(1)}
                </span>
                <button className="ml-auto bg-indigo-100 text-indigo-800 text-xs px-3 py-1.5 rounded-full flex items-center font-medium hover:bg-indigo-200 transition-colors">
                  Play Video <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="flex border-b border-gray-100">
                {["about", "amenities", "gallery"].map((tab) => (
                // {["about", "amenities", "gallery", "review"].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-600 hover:text-indigo-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>
          {/* Owner Panel */}

          
        </div>
      </main>
      {showNotify && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                Notify Owner
              </h3>
              <button
                onClick={() => setShowNotify(false)}
                className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Notification Title
                </label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="Enter Notification Title"
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Notification Message
                </label>
                <textarea
                  value={notificationText}
                  onChange={(e) => setNotificationText(e.target.value)}
                  placeholder="Enter Notification Message"
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 h-32 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => {
                    setNotificationTitle("");
                    setNotificationText("");
                  }}
                  className="border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleSubmitNotification}
                  disabled={
                    !notificationTitle.trim() || !notificationText.trim()
                  }
                  className={`py-2.5 rounded-lg font-medium transition-colors ${
                    notificationTitle.trim() && notificationText.trim()
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
      <ShareModal />
    </div>
  );
}
