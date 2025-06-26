import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';

// Placeholder data for user's contacts
const contacts = [
  { id: '1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
  { id: '2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=bob' },
  { id: '3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?u=charlie' },
  { id: '4', name: 'David', avatarUrl: 'https://i.pravatar.cc/150?u=david' },
  { id: '5', name: 'Eve', avatarUrl: 'https://i.pravatar.cc/150?u=eve' },
  { id: '6', name: 'Frank', avatarUrl: 'https://i.pravatar.cc/150?u=frank' },
  { id: '7', name: 'Grace', avatarUrl: 'https://i.pravatar.cc/150?u=grace' },
  { id: '8', name: 'Heidi', avatarUrl: 'https://i.pravatar.cc/150?u=heidi' },
  { id: '9', name: 'Ivan', avatarUrl: 'https://i.pravatar.cc/150?u=ivan' },
  { id: '10', name: 'Judy', avatarUrl: 'https://i.pravatar.cc/150?u=judy' },
];

const NewChatPage = () => {
  console.log('NewChatPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchTerm) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header page="new-chat" />

      <div className="p-3 border-b">
        <Input
          type="search"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredContacts.map(contact => (
            <Link
              to="/chat"
              state={{ contact }} // Pass contact info to ChatPage
              key={contact.id}
              className="flex items-center p-3 rounded-lg hover:bg-muted cursor-pointer"
            >
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{contact.name}</span>
            </Link>
          ))}
          {filteredContacts.length === 0 && (
            <p className="text-center text-muted-foreground p-4">No contacts found.</p>
          )}
        </div>
      </ScrollArea>
      
      {/* Back button for easy navigation */}
      <div className="p-4 border-t">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page (ChatListPage)
          className="flex items-center justify-center w-full text-sm font-semibold text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Chats
        </button>
      </div>
    </div>
  );
};

export default NewChatPage;