// Layout.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, currentPage, setCurrentPage }) => {
  // Mock User
  const [user] = useState({
    name: "Alex Johnson",
    role: "Premium Client",
    initials: "AJ",
  });

  // Sidebar State
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Detect Mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation
  const navigation = [
    { name: "Dashboard", id: "dashboard", icon: "📊" },
    { name: "Transactions", id: "transactions", icon: "💳" },
    { name: "Loans", id: "loans", icon: "📈" },
    { name: "Profile", id: "profile", icon: "👤" },
    { name: "Settings", id: "settings", icon: "⚙️" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">

      <Navbar user={user} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          navigation={navigation}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isOpen={sidebarOpen}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
