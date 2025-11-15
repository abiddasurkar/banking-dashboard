import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, currentPage, setCurrentPage }) => {

  // User (global for layout)
  const [user] = useState({
    name: "Alex Johnson",
    role: "Premium Client",
    initials: "AJ",
  });

  // Sidebar Logic (Global)
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation (global)
  const navigation = [
    { name: "Dashboard", id: "dashboard", icon: "📊" },
    { name: "Transactions", id: "transactions", icon: "💳" },
    { name: "Loans", id: "loans", icon: "📈" },
    { name: "Profile", id: "profile", icon: "👤" },
    { name: "Settings", id: "settings", icon: "⚙️" },
  ];

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">

      {/* NAVBAR */}
      <Navbar user={user} />

      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR — fully controlled by Layout */}
        <Sidebar
          navigation={navigation}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isOpen={sidebarOpen}
          isMobile={isMobile}
          closeSidebar={closeSidebar}
        />

        {/* CONTENT AREA */}
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
