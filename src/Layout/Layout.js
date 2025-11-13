import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-200 overflow-hidden">
      {/* Navbar fixed at top */}
      <Navbar />

      {/* Sidebar + Scrollable main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar stays fixed */}
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-6 lg:ml-0 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
