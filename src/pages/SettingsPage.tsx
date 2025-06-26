import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Lucide Icons
import { ArrowLeft, Camera, ChevronRight, HelpCircle, LogOut, Shield } from 'lucide-react';

const SettingsPage = () => {
  console.log('SettingsPage loaded');
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('Jane Doe');

  const handleSaveChanges = () => {
    // In a real app, you would save the displayName to your backend here.
    console.log('Saving new display name:', displayName);
    // Optionally, navigate back or show a success toast.
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black">
      {/* The Header component for this page only shows the title */}
      <Header page="settings" />

      {/* We add a dedicated back button for better UX */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <Button variant="ghost" size="sm" onClick={() => navigate('/chat-list')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Chats
        </Button>
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* Profile Section */}
        <section className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change profile picture</span>
            </Button>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input 
              type="text" 
              id="displayName" 
              placeholder="Your Name" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)} 
            />
          </div>
          <Button onClick={handleSaveChanges} className="w-full max-w-sm">
            Save Changes
          </Button>
        </section>

        <Separator />

        {/* Action List Section */}
        <section className="py-6 space-y-2">
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">Privacy & Security</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">Help & Support</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <Separator className="my-2" />
          
          <Link to="/" className="w-full">
            <div className="flex items-center justify-between w-full p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <div className="flex items-center gap-4">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </div>
            </div>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800">
        WhatsApp Lite Clone v1.0.0
      </footer>
    </div>
  );
};

export default SettingsPage;