import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { mockData } from '../data/mockData';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockData.userData);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to an API here
  };

  const handleCancel = () => {
    setProfileData(mockData.userData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const personalInfoFields = [
    { key: 'name', label: 'Full Name', value: profileData.name, type: 'text' },
    { key: 'email', label: 'Email Address', value: profileData.email, type: 'email' },
    { key: 'phone', label: 'Phone Number', value: profileData.phone, type: 'tel' },
    { key: 'memberSince', label: 'Member Since', value: profileData.memberSince, type: 'text', readOnly: true },
  ];

  const accountStats = [
    { label: 'Account Type', value: 'Premium', color: 'purple' },
    { label: 'Verification', value: 'Verified', color: 'emerald' },
    { label: 'Account Status', value: 'Active', color: 'emerald' },
    { label: 'Last Login', value: 'Today, 09:42 AM', color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your personal information and account settings.</p>
          </div>
          {!isEditing ? (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Edit Profile
            </motion.button>
          ) : (
            <div className="flex gap-3">
              <motion.button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardContent className="text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                AJ
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium">Premium Client</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Member since {profileData.memberSince}</p>
              
              <div className="w-full border-t border-gray-200 dark:border-slate-700 my-4"></div>
              
              <div className="space-y-3 w-full">
                {accountStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                    <Badge variant={stat.color === 'emerald' ? 'success' : 
                                   stat.color === 'purple' ? 'default' : 'default'}>
                      {stat.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
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
                  {isEditing && !field.readOnly ? (
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium py-2 px-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      {field.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Primary Account</p>
                  <p className="text-gray-900 dark:text-white font-semibold">Checking •••• 4829</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Customer ID</p>
                  <p className="text-gray-900 dark:text-white font-semibold">EB-7294-1836</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Quick Actions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security & Preferences</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔒</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Change Password</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Update your account password</p>
            </button>
            
            <button className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📱</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Two-Factor Auth</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enable extra security layer</p>
            </button>
            
            <button className="p-4 text-left border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔔</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your alert preferences</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;