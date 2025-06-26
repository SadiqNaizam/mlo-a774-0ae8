import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble, { MessageBubbleProps } from '@/components/MessageBubble';
import MessageInputBar from '@/components/MessageInputBar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample conversation data for demonstration
const initialMessages: MessageBubbleProps[] = [
  {
    text: "Hey! How's the project coming along?",
    timestamp: '10:00 AM',
    isOutgoing: false,
    status: 'read', // Status for incoming doesn't render a receipt, but good to have
  },
  {
    text: "It's going great! Just pushed the final changes to the main branch. You should check it out.",
    timestamp: '10:01 AM',
    isOutgoing: true,
    status: 'read',
  },
  {
    text: "Awesome, I'll take a look now. Did you manage to fix that tricky bug with the state management?",
    timestamp: '10:01 AM',
    isOutgoing: false,
    status: 'read',
  },
  {
    text: "Yep, it was a classic race condition. Wrapped it in a `useEffect` with the right dependencies and it's solid now.",
    timestamp: '10:02 AM',
    isOutgoing: true,
    status: 'delivered',
  },
];


const ChatPage = () => {
  console.log('ChatPage loaded');
  const [messages, setMessages] = useState<MessageBubbleProps[]>(initialMessages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollViewport = scrollAreaRef.current.querySelector('div');
        if (scrollViewport) {
            scrollViewport.scrollTop = scrollViewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSendMessage = (newMessageText: string) => {
    const newMessage: MessageBubbleProps = {
      text: newMessageText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      isOutgoing: true,
      status: 'sent',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <ChatHeader
        recipientName="Jane Doe"
        recipientAvatarUrl="https://i.pravatar.cc/150?u=jane_doe"
        onlineStatus="Online"
      />

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          {/* Padding at the bottom to ensure last message is not hidden by the input bar */}
          <div className="p-4 space-y-4 pb-28">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                text={msg.text}
                timestamp={msg.timestamp}
                isOutgoing={msg.isOutgoing}
                status={msg.status}
              />
            ))}
          </div>
        </ScrollArea>
      </main>

      {/* MessageInputBar is fixed to the bottom, so it's placed outside the main flex flow */}
      <MessageInputBar onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;