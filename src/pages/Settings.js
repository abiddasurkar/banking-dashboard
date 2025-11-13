import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const ToggleSwitch = ({ value, onChange }) => (
    <motion.button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="inline-block h-4 w-4 rounded-full bg-white transition-transform"
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      />
    </motion.button>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your banking experience.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
            </div>
            <ToggleSwitch value={isDark} onChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
            </div>
            <ToggleSwitch value={twoFactor} onChange={setTwoFactor} />
          </div>
          <button className="w-full mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
            Change Password
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about your account</p>
            </div>
            <ToggleSwitch value={notifications} onChange={setNotifications} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;