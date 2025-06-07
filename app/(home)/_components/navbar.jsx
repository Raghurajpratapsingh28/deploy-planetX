"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CgProfile, CgSearch } from "react-icons/cg";
import { Bell, ChevronDown, FileText, LayoutDashboard, LogOut, Menu as MenuIcon, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { formatDistanceToNow } from "date-fns";
import { Menu, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

// Import Poppins font
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Dropdown data with titles, descriptions, and icons
const featuresDropdown = [
  {
    href: "/show-property",
    label: "All Properties",
    description: "Find your dream property like home office hotel or more",
    icon: "🏢",
  },
  {
    href: "/show-property?feature=residential",
    label: "Residential",
    description: "Find your dream home with our curated listings.",
    icon: "🏡",
  },
  {
    href: "/gym",
    label: "Gym",
    description: "Discover top-tier fitness facilities near you.",
    icon: "💪",
  },
  {
    href: "/parking",
    label: "Parking",
    description: "Secure convenient parking solutions for your needs.",
    icon: "🚗",
  },
];

const resourcesDropdown = [
  {
    href: "/dashboard/add-property",
    label: "Post Property",
    description: "List your property for free on our platform.",
    badge: "FREE",
    icon: "🏠",
  },
  {
    href: "/dashboard/add-gym",
    label: "Post Gym",
    description: "Showcase your gym to attract fitness enthusiasts.",
    badge: "FREE",
    icon: "🏋️",
  },
  {
    href: "/dashboard/add-parking",
    label: "Post parking",
    description: "Show your parking to the world",
    badge: "FREE",
    icon: "🚗",
  },
];

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  // Preserve existing authentication and notification logic
  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    setIsLoggedIn(!!token);

    if (token) {
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
            headers: { Authorization: token },
          });
          setUser(userResponse.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchNotifications = async () => {
        try {
          setLoading(true);
          const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
            headers: { Authorization: token },
          });
          const userId = userResponse.data.user._id;
          const response = await axios.get(
            `${BACKEND_URL}/properties/notification/${userId}`,
            { headers: { Authorization: token } }
          );
          setNotifications((prev) => {
            const prevIds = prev.map((n) => n._id);
            const newNotifications = response.data || [];
            const newIds = newNotifications.map((n) => n._id);
            if (JSON.stringify(prevIds) !== JSON.stringify(newIds)) {
              return newNotifications;
            }
            return prev;
          });
        } catch (error) {
          if (error.response?.data?.message === "No notifications found for this user.") {
            return;
          }
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 30000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUser(null);
    setNotifications([]);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    router.push("/login");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ").filter(Boolean);
    const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
    return initials || "";
  };

  const firstName = user?.name?.split(" ")[0] || "User";

  // Main navigation links
  const navLinks = [
    { href: "/", label: "Home" },
  ];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      router.push(`#`);
      setSearchOpen(false);
      e.target.reset();
    }
  };

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <nav className={`w-full bg-white sticky top-0 z-50 shadow-md ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
        <div className="flex items-center justify-between h-20 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
          {/* Logo Section */}
          <div className="flex items-center -ml-4 sm:-ml-6 lg:-ml-8">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.png"
                  width={48}
                  height={48}
                  alt="Planet X Logo"
                  className="object-contain"
                />
              </motion.div>
              <span className="font-bold text-3xl text-gray-900 group-hover:text-[#4CAF50] transition-colors">
                PLANET X
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-gray-700 hover:text-[#4CAF50] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4CAF50] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
            ))}
            {/* Features Dropdown (Mega Menu) */}
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button
                    className="flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-[#4CAF50] transition-colors duration-200 relative group"
                    aria-haspopup="true"
                    aria-expanded={open}
                  >
                    Features
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4CAF50] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </Menu.Button>
                  <Transition
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-lg shadow-xl border border-gray-100 z-50 p-6"
                  >
                    <Menu.Items
                      static
                      className="grid grid-cols-2 gap-4 focus:outline-none"
                    >
                      {featuresDropdown.map((item) => (
                        <Menu.Item key={item.href}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={`flex items-start gap-3 p-3 rounded-md transition-colors ${
                                active ? "bg-gray-50" : ""
                              }`}
                            >
                              <span className="text-lg">{item.icon}</span>
                              <div>
                                <p className="text-base font-medium text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
            {/* Resources Dropdown */}
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button
                    className="flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-[#4CAF50] transition-colors duration-200 relative group"
                    aria-haspopup="true"
                    aria-expanded={open}
                  >
                    Resources
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4CAF50] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </Menu.Button>
                  <Transition
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 p-4"
                  >
                    <Menu.Items static className="focus:outline-none">
                      {resourcesDropdown.map((item) => (
                        <Menu.Item key={item.href}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={`flex items-start gap-3 p-3 rounded-md transition-colors ${
                                active ? "bg-gray-50" : ""
                              }`}
                            >
                              <span className="text-lg">{item.icon}</span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-base font-medium text-gray-900">{item.label}</p>
                                  {item.badge && (
                                    <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-sm rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
            <Link
              href="/highlights"
              className="text-lg font-medium text-gray-700 hover:text-[#4CAF50] transition-colors duration-200 relative group"
            >
              Highlights
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4CAF50] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link
              href="/dashboard/wishlist"
              className="text-lg font-medium text-gray-700 hover:text-[#4CAF50] transition-colors duration-200 relative group"
            >
              Wishlist
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4CAF50] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium text-gray-700 hover:text-[#4CAF50] transition-colors duration-200 relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4CAF50] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </div>

          {/* Desktop Right Section (Search, CTA, Notifications, User Profile) */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-700 hover:text-[#4CAF50] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] h-12 w-12"
                aria-label="Toggle search"
              >
                <CgSearch className="h-6 w-6" />
              </Button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSearch}
                    className="absolute top-1/2 -translate-y-1/2 right-12 w-48 bg-white border border-gray-200 rounded-full shadow-sm flex items-center"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      name="search"
                      placeholder="Search..."
                      className="w-full px-4 py-2 text-base bg-transparent focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="pr-4 text-gray-500 hover:text-[#4CAF50]"
                      aria-label="Submit search"
                    >
                      <CgSearch className="h-4 w-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        as={Button}
                        variant="outline"
                        size="icon"
                        className="rounded-full w-12 h-12 bg-white/80 hover:bg-[#4CAF50] hover:text-white transition-all duration-300 border-gray-200 shadow-sm"
                        aria-label="Toggle notifications"
                        aria-expanded={open}
                      >
                        <Bell className="h-6 w-6" />
                      </Menu.Button>
                      <Transition
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-[400px] overflow-y-auto"
                      >
                        <Menu.Items static className="focus:outline-none">
                          <div className="p-4 border-b">
                            <h3 className="font-semibold text-xl text-gray-900">Notifications</h3>
                          </div>
                          {loading ? (
                            <div className="p-4 text-center text-gray-500">
                              Loading notifications...
                            </div>
                          ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <Menu.Item key={notification._id}>
                                {({ active }) => (
                                  <div
                                    className={`p-4 border-b last:border-b-0 transition-colors ${
                                      active || notification.unread ? "bg-gray-50" : ""
                                    }`}
                                  >
                                    <p className="text-base font-medium text-gray-800">
                                      {notification.heading}
                                    </p>
                                    <p className="text-base text-gray-600">{notification.text}</p>
                                    <div className="flex justify-between items-center mt-1">
                                      <p className="text-sm text-gray-500">
                                        From: {notification.userId?.name || "Unknown User"}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        {formatDistanceToNow(new Date(notification.date), {
                                          addSuffix: true,
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </Menu.Item>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              No notifications yet
                            </div>
                          )}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
                {/* User Profile Dropdown */}
                <Menu as="div" className="relative hidden lg:block">
      {({ open }) => (
        <>
          <Menu.Button
            className="group flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 -mr-4 sm:-mr-6 lg:-mr-8"
            aria-label="Toggle user menu"
            aria-expanded={open}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CED5D8] to-[#A1A8AB] flex items-center justify-center text-white font-medium text-lg shadow-inner ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all duration-300">
              {getInitials(user?.name)}
            </div>
            <span className="font-medium text-lg text-gray-800 hidden xl:block group-hover:text-blue-600 transition-colors duration-200">
              {firstName}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-all duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </Menu.Button>
          <Transition
            as={motion.div}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{
              opacity: open ? 1 : 0,
              y: open ? 0 : -10,
              scale: open ? 1 : 0.95,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            <Menu.Items static className="focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard/profile"
                    className={`flex items-center gap-3 px-5 py-3 rounded-t-xl text-lg font-medium text-gray-700 transition-all duration-200 ${
                      active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    My Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-5 py-3 text-lg font-medium text-gray-700 transition-all duration-200 ${
                      active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard/myBlogs"
                    className={`flex items-center gap-3 px-5 py-3 text-lg font-medium text-gray-700 transition-all duration-200 ${
                      active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                    My Blogs
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full text-left px-5 py-3 rounded-b-xl text-lg font-medium text-red-600 transition-all duration-200 ${
                      active ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
              </>
            ) : (
              <Button
                asChild
                className="bg-[#4CAF50] text-white px-8 py-3 rounded-full hover:bg-[#45a049] transition-all duration-300 shadow-md text-lg -mr-4 sm:-mr-6 lg:-mr-8"
              >
                <Link href="/login">Get Started</Link>
              </Button>
            )}
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-[#4CAF50] h-12 w-12 -mr-4 sm:-mr-6 lg:-mr-8"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 py-6 px-4 sm:px-6 lg:px-8"
            >
              <div className="flex flex-col gap-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <CgSearch className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="w-full bg-transparent text-base focus:outline-none"
                  />
                </form>
                {/* Home Link */}
                <Link
                  href="/"
                  className="text-xl font-medium text-gray-700 hover:text-[#4CAF50] py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                {/* Mobile Features Dropdown */}
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className="flex items-center justify-between w-full text-xl font-medium text-gray-700 hover:text-[#4CAF50] py-2"
                        aria-haspopup="true"
                        aria-expanded={open}
                      >
                        Features
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                      </Menu.Button>
                      <Transition
                        as={motion.div}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 space-y-2"
                      >
                        <Menu.Items static className="focus:outline-none">
                          {featuresDropdown.map((item) => (
                            <Menu.Item key={item.href}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={`flex items-start gap-3 py-2 transition-colors ${
                                    active ? "text-[#4CAF50]" : ""
                                  }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <span className="text-lg">{item.icon}</span>
                                  <div>
                                    <p className="text-base font-medium text-gray-900">{item.label}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
                {/* Mobile Resources Dropdown */}
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className="flex items-center justify-between w-full text-xl font-medium text-gray-700 hover:text-[#4CAF50] py-2"
                        aria-haspopup="true"
                        aria-expanded={open}
                      >
                        Resources
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                      </Menu.Button>
                      <Transition
                        as={motion.div}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 space-y-2"
                      >
                        <Menu.Items static className="focus:outline-none">
                          {resourcesDropdown.map((item) => (
                            <Menu.Item key={item.href}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={`flex items-start gap-3 py-2 transition-colors ${
                                    active ? "text-[#4CAF50]" : ""
                                  }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <span className="text-lg">{item.icon}</span>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="text-base font-medium text-gray-900">{item.label}</p>
                                      {item.badge && (
                                        <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-sm rounded-full">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
                {/* Highlights Link */}
                <Link
                  href="/highlights"
                  className="text-xl font-medium text-gray-700 hover:text-[#4CAF50] py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Highlights
                </Link>
                {/* Wishlist Link */}
                <Link
                  href="/dashboard/wishlist"
                  className="text-xl font-medium text-gray-700 hover:text-[#4CAF50] py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
                {/* Blog Link */}
                <Link
                  href="/blog"
                  className="text-xl font-medium text-gray-700 hover:text-[#4CAF50] py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                {isLoggedIn ? (
                  <div className="space-y-3 px-4 py-6 bg-white shadow-lg rounded-b-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CED5D8] to-[#A1A8AB] flex items-center justify-center text-white font-medium text-lg shadow-inner ring-2 ring-gray-200">
                      {getInitials(user?.name)}
                    </div>
                    <span className="text-xl font-medium text-gray-800">{firstName}</span>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/myBlogs"
                    className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="h-5 w-5" />
                    My Blogs
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left py-3 px-4 text-lg font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
                ) : (
                  <Button
                    asChild
                    className="bg-[#4CAF50] text-white px-6 py-3 rounded-full hover:bg-[#45a049] transition-all duration-300"
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};