import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Smile, Send } from 'lucide-react';

interface MessageInputBarProps {
  onSendMessage: (message: string) => void;
}

const MessageInputBar: React.FC<MessageInputBarProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log('MessageInputBar loaded');

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [message]);
  
  // Auto-focus the textarea on initial render
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 sm:p-4">
      <div className="container mx-auto max-w-4xl">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <Toggle 
            aria-label="Toggle emoji picker"
            onClick={() => console.log('Emoji picker clicked')}
            className="self-end"
          >
            <Smile className="h-5 w-5" />
          </Toggle>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none max-h-40 overflow-y-auto"
          />
          {message.trim() && (
            <Button type="submit" size="icon" className="self-end">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MessageInputBar;