// Navbar.jsx
import React from "react";
import ThemeToggle from "../components/UI/ThemeToggle";

const Navbar = ({ user, toggleSidebar }) => (
  <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30">
    <div className="px-6 py-4 flex items-center justify-between">

      {/* Mobile Sidebar Button */}
      <button
        className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Brand */}
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Enterprise Banking
      </h1>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        {/* User */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user.initials}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
