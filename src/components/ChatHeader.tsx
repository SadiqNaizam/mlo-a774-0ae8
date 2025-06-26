import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
  recipientName: string;
  recipientAvatarUrl: string;
  onlineStatus: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  recipientName,
  recipientAvatarUrl,
  onlineStatus,
}) => {
  console.log('ChatHeader loaded for:', recipientName);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="flex items-center p-3 border-b bg-muted sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Link to="/chat-list" aria-label="Back to chat list">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Avatar className="h-10 w-10">
          <AvatarImage src={recipientAvatarUrl} alt={recipientName} className="object-cover" />
          <AvatarFallback>{getInitials(recipientName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="font-semibold text-base">{recipientName}</h2>
          <p className="text-sm text-muted-foreground">{onlineStatus}</p>
        </div>
      </div>
      {/* Placeholder for future action icons like call or video */}
    </header>
  );
};

export default ChatHeader;