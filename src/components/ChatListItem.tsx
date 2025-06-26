```tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatListItemProps {
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
  isSelected?: boolean;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  lastMessage,
  time,
  avatar,
  unreadCount = 0,
  isSelected = false
}) => {
  return (
    <div
      className={cn(
        "flex items-center p-3 hover:bg-muted/50 cursor-pointer transition-colors",
        isSelected && "bg-muted"
      )}
    >
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-grow overflow-hidden">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {lastMessage}
        </p>
      </div>
      <div className="flex flex-col items-end space-y-1 ml-2 shrink-0">
        <span className="text-xs text-muted-foreground">{time}</span>
        {unreadCount > 0 && (
          <span className="flex items-center justify-center h-5 w-5 text-xs font-bold text-primary-foreground bg-primary rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};
```