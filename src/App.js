import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./Layout/Layout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Loans from "./pages/Loans";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "loans":
        return <Loans />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
};

export default App;
