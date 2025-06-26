import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount,
}) => {
  console.log('ChatListItem loaded for:', name);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <Link
      to="/chat"
      state={{ chatId: id, contactName: name, contactAvatar: avatarUrl }} // Pass contact info to the chat page
      className={cn(
        "flex items-center p-3 space-x-4 w-full text-left transition-colors duration-150",
        "hover:bg-muted border-b border-border"
      )}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar className="h-14 w-14 border-2 border-transparent">
          <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>

      {/* Name and Last Message */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground truncate mt-1">
          {lastMessage}
        </p>
      </div>

      {/* Timestamp and Unread Badge */}
      <div className="flex flex-col items-end space-y-2 self-start flex-shrink-0 ml-2">
        <p className="text-xs text-primary font-medium whitespace-nowrap">
          {timestamp}
        </p>
        {unreadCount > 0 ? (
          <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center p-0 text-xs">
            {unreadCount}
          </Badge>
        ) : (
          <div className="h-6 w-6" /> // Placeholder to keep alignment consistent
        )}
      </div>
    </Link>
  );
};

export default ChatListItem;