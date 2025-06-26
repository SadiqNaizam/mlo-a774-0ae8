import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import ChatListItem from '@/components/ChatListItem';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

// Define the interface for a chat item to be used in the sample data array
interface Chat {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

// Sample Data to simulate active chats
const sampleChats: Chat[] = [
  {
    id: 'chat-1',
    name: 'Alice Johnson',
    avatarUrl: 'https://placehold.co/100x100/A7C7E7/4F4F4F?text=AJ',
    lastMessage: 'Sounds great! See you then.',
    timestamp: '10:42 AM',
    unreadCount: 2,
  },
  {
    id: 'chat-2',
    name: 'Bob Williams',
    avatarUrl: 'https://placehold.co/100x100/F2D2BD/4F4F4F?text=BW',
    lastMessage: 'Can you send me the file?',
    timestamp: '10:30 AM',
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    name: 'Charlie Brown',
    lastMessage: 'Okay, I will check it out.',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'chat-4',
    name: 'Diana Prince',
    avatarUrl: 'https://placehold.co/100x100/D3D3D3/4F4F4F?text=DP',
    lastMessage: 'Happy Birthday! 🎉',
    timestamp: 'Yesterday',
    unreadCount: 5,
  },
  {
    id: 'chat-5',
    name: 'Ethan Hunt',
    avatarUrl: 'https://placehold.co/100x100/C1E1C1/4F4F4F?text=EH',
    lastMessage: 'Mission accomplished.',
    timestamp: '2 days ago',
    unreadCount: 0,
  },
];

const ChatListPage = () => {
  console.log('ChatListPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = sampleChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header page="chat-list" />

      {/* Search Bar */}
      <div className="p-3 border-b border-border">
        <Input
          type="search"
          placeholder="Search chats or start a new one"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-muted border-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <ScrollArea className="flex-1">
        {filteredChats.length > 0 ? (
          <div>
            {filteredChats.map(chat => (
              <ChatListItem key={chat.id} {...chat} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
            <Users className="h-16 w-16 mb-4" />
            <h2 className="text-xl font-semibold text-foreground">
              {searchTerm ? 'No Chats Found' : 'Welcome!'}
            </h2>
            <p className="mt-2 mb-4 max-w-xs">
              {searchTerm
                ? `No chats match your search for "${searchTerm}".`
                : "You don't have any chats yet. Tap below to start a conversation with your contacts."}
            </p>
            {!searchTerm && (
              <Button asChild>
                <Link to="/new-chat">Start New Chat</Link>
              </Button>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatListPage;