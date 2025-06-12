import React, { useState } from "react";
import {
  Key,
  Mail,
  Link,
  User,
  MessageSquare,
  Lock,
  Eye,
  Users,
  MessageCircle,
  Bell,
  Volume2,
  Palette,
  Image,
  Shield,
  ShieldCheck,
  Activity,
  LogOut,
  Trash2,
  Database,
  HardDrive,
  Trash,
  Download,
  HelpCircle,
  AlertCircle,
  Info,
  FileText,
  UserCircle,
  ChevronDown,
  ChevronUp,
  Settings,
  ArrowLeftToLine,
  ArrowBigLeftIcon,
  ArrowLeft,
  ArrowLeftIcon,
} from "lucide-react";

const UserSettings = ({
    setShowUserSettings,
}) => {
  const [openCategory, setOpenCategory] = useState("account");

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const SettingsCategory = ({ id, title, icon: Icon, children }) => {
    const isOpen = openCategory === id;
    return (
      <div className="mb-4 bg-white rounded-lg shadow overflow-hidden">
        <button
          className="w-full flex items-center justify-between p-4 text-left"
          onClick={() => toggleCategory(id)}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {isOpen && <div className="px-4 pb-4">{children}</div>}
      </div>
    );
  };

  const SettingsItem = ({ icon: Icon, label, onClick }) => (
    <button
      className="w-full flex items-center gap-3 py-2 px-3 rounded-md hover:bg-blue-50 transition-colors text-left"
      onClick={onClick}
    >
      <Icon className="h-4 w-4 text-blue-600" />
      <span>{label}</span>
    </button>
  );

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="header flex items-center gap-4 mb-6 w-full justify-between">
          <button className="goBack p-2 hover:bg-blue-400 rounded-full text-blue-700 hover:text-white transition duration-300" onClick={() => setShowUserSettings(false)}>
            <ArrowLeftToLine className="size-8 " />
          </button>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-700">
            <Settings className="h-7 w-7" />
            Settings
          </h1>
        </div>
        <SettingsCategory id="account" title="Account" icon={User}>
          <SettingsItem icon={Key} label="Change Password" />
          <SettingsItem icon={Mail} label="Change Email/Phone" />
          <SettingsItem icon={Link} label="Manage Connected Accounts" />
        </SettingsCategory>

        <SettingsCategory id="profile" title="Profile" icon={UserCircle}>
          <SettingsItem icon={User} label="Edit Profile Info" />
          <SettingsItem icon={MessageSquare} label="Set/Update Status" />
        </SettingsCategory>

        <SettingsCategory id="privacy" title="Privacy" icon={Lock}>
          <SettingsItem icon={Eye} label="Profile/Status Visibility" />
          <SettingsItem icon={Users} label="Blocked Users" />
          <SettingsItem icon={MessageCircle} label="Read Receipts" />
        </SettingsCategory>

        <SettingsCategory id="notifications" title="Notifications" icon={Bell}>
          <SettingsItem icon={Bell} label="Push Notifications" />
          <SettingsItem icon={Volume2} label="Sound/Vibration" />
          <SettingsItem icon={Bell} label="Mute Chats/Groups" />
        </SettingsCategory>

        <SettingsCategory id="appearance" title="Appearance" icon={Palette}>
          <SettingsItem icon={Palette} label="Theme (Light/Dark)" />
          <SettingsItem icon={Image} label="Chat Wallpaper" />
        </SettingsCategory>

        <SettingsCategory id="security" title="Security" icon={Shield}>
          <SettingsItem icon={ShieldCheck} label="Two-Factor Authentication" />
          <SettingsItem icon={Activity} label="Active Sessions" />
          <SettingsItem icon={LogOut} label="Logout All Devices" />
        </SettingsCategory>

        <SettingsCategory id="data" title="Data & Storage" icon={Database}>
          <SettingsItem icon={HardDrive} label="Manage Storage" />
          <SettingsItem icon={Trash} label="Clear Chat History" />
          <SettingsItem icon={Download} label="Download My Data" />
        </SettingsCategory>

        <SettingsCategory id="support" title="Support" icon={HelpCircle}>
          <SettingsItem icon={HelpCircle} label="Help / FAQ" />
          <SettingsItem icon={MessageCircle} label="Contact Support" />
          <SettingsItem icon={AlertCircle} label="Report a Problem" />
        </SettingsCategory>

        <SettingsCategory id="about" title="About" icon={Info}>
          <SettingsItem icon={FileText} label="Terms of Service" />
          <SettingsItem icon={FileText} label="Privacy Policy" />
        </SettingsCategory>

        <div className="mt-8 flex flex-col gap-2">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 flex items-center justify-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserSettings;
