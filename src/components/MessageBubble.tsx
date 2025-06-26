import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface MessageBubbleProps {
  text: string;
  timestamp: string;
  isOutgoing: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const ReadReceipt: React.FC<{ status: MessageBubbleProps['status'] }> = ({ status }) => {
  if (status === 'sent') {
    return <Check size={16} className="text-muted-foreground" />;
  }
  if (status === 'delivered') {
    return <CheckCheck size={16} className="text-muted-foreground" />;
  }
  if (status === 'read') {
    return <CheckCheck size={16} className="text-accent" />;
  }
  return null;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  timestamp,
  isOutgoing,
  status,
}) => {
  console.log('MessageBubble loaded');

  const bubbleAlignment = isOutgoing ? 'justify-end' : 'justify-start';
  const bubbleStyles = isOutgoing
    ? 'bg-primary text-primary-foreground'
    : 'bg-card text-card-foreground';

  return (
    <div className={cn('flex w-full mb-2', bubbleAlignment)}>
      <div
        className={cn(
          'p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-2xl relative shadow-sm',
          bubbleStyles
        )}
      >
        <p className="text-sm break-words pr-16">{text}</p>
        <div className="absolute bottom-1 right-2 flex items-center space-x-1">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {isOutgoing && <ReadReceipt status={status} />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;