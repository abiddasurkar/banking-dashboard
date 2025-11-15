import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ToggleSwitch from "../components/ui/ToggleSwitch";

// IMPORT ALL DATA FROM mockData.js
import { profilePageData } from "../data/mockData";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Load initial profile data
  const [profileData, setProfileData] = useState(profilePageData.profile);

  // Direct references from mockData
  const securitySettings = profilePageData.securitySettings;
  const notificationSettings = profilePageData.notificationSettings;
  const accountStats = profilePageData.accountStats;

  // Build all personal fields from mockData keys
  const personalInfoFields = profilePageData.personalInfoFields.map((field) => ({
    ...field,
    value: profileData[field.key],
  }));

  const handleSave = () => {
    setIsEditing(false);
    // API save can be placed here
  };

  const handleCancel = () => {
    // Reset to original mock data
    setProfileData(profilePageData.profile);
    setIsEditing(false);
  };

  const handleChange = (key, value) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const TabButton = ({ id, label, icon, isActive, onClick }) => (
    <motion.button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all w-full text-left ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
      }`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>

      {isActive && (
        <motion.span
          className="ml-auto text-blue-600 dark:text-blue-400"
          initial={{ x: -10 }}
          animate={{ x: 0 }}
        >
          →
        </motion.span>
      )}
    </motion.button>
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile & Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your personal information and account preferences.
            </p>
          </div>

          {!isEditing ? (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ✏️ Edit Profile
            </motion.button>
          ) : (
            <div className="flex gap-3">
              <motion.button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm flex items-center gap-2"
              >
                💾 Save Changes
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="space-y-2">
              {[
                { id: "personal", label: "Personal Info", icon: "👤" },
                { id: "security", label: "Security", icon: "🔒" },
                { id: "notifications", label: "Notifications", icon: "🔔" },
                { id: "preferences", label: "Preferences", icon: "⚙️" },
              ].map((tab) => (
                <TabButton
                  key={tab.id}
                  {...tab}
                  isActive={activeTab === tab.id}
                  onClick={setActiveTab}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* PERSONAL TAB */}
          {activeTab === "personal" && (
            <>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    Personal Information
                    <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  </h3>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {personalInfoFields.map((field, idx) => (
                      <motion.div
                        key={field.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                          {field.label}
                        </label>

                        {isEditing ? (
                          <input
                            type={field.type}
                            value={field.value}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white font-medium py-2 px-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                            {field.value}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ACCOUNT OVERVIEW */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Account Overview
                  </h3>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {profileData.name}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400">Premium Client</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Member since {profileData.memberSince}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3">
                      {accountStats.map((stat, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.label}
                          </span>
                          <Badge variant={stat.color === "emerald" ? "success" : "default"}>
                            {stat.value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Security Settings
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {securitySettings.map((setting, idx) => (
                    <motion.div
                      key={setting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {setting.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {setting.description}
                        </p>
                      </div>
                      <ToggleSwitch value={setting.enabled} onChange={() => {}} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* NOTIFICATION TAB */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notification Preferences
                </h3>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {notificationSettings.map((setting, idx) => (
                    <motion.div
                      key={setting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {setting.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {setting.description}
                        </p>
                      </div>
                      <ToggleSwitch value={setting.enabled} onChange={() => {}} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
