import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette, Bell, Shield, Globe, Moon, Sun,
  FileText, Bug, BookOpen, ChevronRight
} from "lucide-react";
import { settingsPageData } from "../data/mockData";

const Settings = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("appearance");
  const [notifications, setNotifications] = useState(settingsPageData.notificationDefaults);
  const [privacy, setPrivacy] = useState(settingsPageData.privacyDefaults);

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
      {children}
    </div>
  );

  const CardContent = ({ children }) => (
    <div className="p-6">{children}</div>
  );

  const Badge = ({ children, variant = "default" }) => {
    const variants = {
      default: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300",
      success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    };
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
        {children}
      </span>
    );
  };

  const ToggleSwitch = ({ value, onChange }) => (
    <motion.button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        value ? "bg-blue-600" : "bg-gray-300 dark:bg-slate-600"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="inline-block h-4 w-4 transform rounded-full bg-white"
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      />
    </motion.button>
  );

  const SectionButton = ({ section, isActive, onClick }) => {
    const Icon = section.icon;
    return (
      <motion.button
        onClick={() => onClick(section.id)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all w-full text-left ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
        }`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="w-5 h-5" />
        <span>{section.label}</span>
        {isActive && (
          <motion.span
            className="ml-auto text-blue-600 dark:text-blue-400"
            initial={{ x: -10 }}
            animate={{ x: 0 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.span>
        )}
      </motion.button>
    );
  };

  const SettingItem = ({ title, description, enabled, onChange, icon }) => (
    <motion.div
      className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center space-x-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <ToggleSwitch value={enabled} onChange={onChange} />
    </motion.div>
  );

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Customize your banking experience and preferences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-6">
            <div className="space-y-2">
              {settingsPageData.settingsSections.map((section) => (
                <SectionButton
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={setActiveSection}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Appearance */}
          {activeSection === "appearance" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Appearance
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SettingItem
                    title="Dark Mode"
                    description="Switch between light and dark themes"
                    enabled={isDark}
                    onChange={setIsDark}
                    icon={isDark ? "🌙" : "☀️"}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <motion.button
                      className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                        🎯
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Font Size
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Adjust text size for better readability
                      </p>
                    </motion.button>

                    <motion.button
                      className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                        🎨
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Color Theme
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Choose your preferred color scheme
                      </p>
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notification Preferences
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => {
                    const config = settingsPageData.notificationLabels[key];
                    return (
                      <SettingItem
                        key={key}
                        title={config.title}
                        description={config.description}
                        enabled={value}
                        onChange={(val) =>
                          setNotifications((prev) => ({ ...prev, [key]: val }))
                        }
                        icon={config.icon}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Privacy */}
          {activeSection === "privacy" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Privacy & Security
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(privacy).map(([key, value]) => {
                    const config = settingsPageData.privacyLabels[key];
                    return (
                      <SettingItem
                        key={key}
                        title={config.title}
                        description={config.description}
                        enabled={value}
                        onChange={(val) =>
                          setPrivacy((prev) => ({ ...prev, [key]: val }))
                        }
                        icon={config.icon}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Language */}
          {activeSection === "language" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Language & Region
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                      Preferred Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {settingsPageData.languageOptions.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.native})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                      Date Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                      Time Zone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="est">Eastern Time (ET)</option>
                      <option value="cst">Central Time (CT)</option>
                      <option value="pst">Pacific Time (PT)</option>
                      <option value="gmt">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* About */}
          {activeSection === "about" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    About Enterprise Banking
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      EB
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Enterprise Banking
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Version 2.4.1
                      </p>
                      <Badge variant="success">Latest Version</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                        📖
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        User Guide
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Learn how to use all features
                      </p>
                    </motion.button>

                    <motion.button
                      className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                        🐛
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Report Issue
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Found a bug? Let us know
                      </p>
                    </motion.button>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Legal
                    </h4>
                    <div className="space-y-2 text-sm">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline block">
                        Terms of Service
                      </button>
                      <button className="text-blue-600 dark:text-blue-400 hover:underline block">
                        Privacy Policy
                      </button>
                      <button className="text-blue-600 dark:text-blue-400 hover:underline block">
                        License Information
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;