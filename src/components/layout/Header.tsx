import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MessageSquarePlus } from 'lucide-react';

interface HeaderProps {
  page: 'chat-list' | 'new-chat' | 'settings';
}

const Header: React.FC<HeaderProps> = ({ page }) => {
  console.log(`Header loaded for page: ${page}`);

  const getTitle = (): string => {
    switch (page) {
      case 'chat-list':
        return 'WhatsApp Lite';
      case 'new-chat':
        return 'Select contact';
      case 'settings':
        return 'Settings';
      default:
        // Fallback title
        return 'WhatsApp Lite';
    }
  };

  const renderActions = (): React.ReactNode => {
    switch (page) {
      case 'chat-list':
        return (
          <>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search chats</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/new-chat">
                <MessageSquarePlus className="h-5 w-5" />
                <span className="sr-only">New Chat</span>
              </Link>
            </Button>
          </>
        );
      case 'new-chat':
        return (
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search contacts</span>
          </Button>
        );
      case 'settings':
        // No actions are needed for the settings page.
        return null;
      default:
        return null;
    }
  };

  return (
    <header className="flex items-center justify-between p-3 border-b bg-background sticky top-0 z-10">
      <h1 className="text-xl font-semibold">{getTitle()}</h1>
      <div className="flex items-center gap-1">
        {renderActions()}
      </div>
    </header>
  );
};

export default Header;