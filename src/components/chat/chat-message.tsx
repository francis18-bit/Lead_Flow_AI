import { Bot, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ChatMessageProps {
  message?: Message;
  isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isAssistant = message?.role === 'assistant' || isLoading;

  if (isLoading) {
    return (
      <div className="flex items-end gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot />
          </AvatarFallback>
        </Avatar>
        <Card className="max-w-md p-3">
            <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></span>
            </div>
        </Card>
      </div>
    );
  }

  if (!message) return null;

  return (
    <div
      className={cn(
        'flex items-end gap-3',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {isAssistant && (
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col gap-2", isAssistant ? "items-start" : "items-end")}>
        <Card
          className={cn(
            'max-w-md rounded-2xl p-3 shadow-md',
            isAssistant
              ? 'rounded-bl-none bg-secondary text-secondary-foreground'
              : 'rounded-br-none bg-primary text-primary-foreground'
          )}
        >
          <CardContent className="p-0 text-sm">
            {message.content}
          </CardContent>
        </Card>

        {isAssistant && message.action === 'BOOK_MEETING' && message.calendarLink && (
          <Button asChild variant="accent" className="bg-accent hover:bg-accent/90">
            <Link href={message.calendarLink} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" />
              Book a meeting
            </Link>
          </Button>
        )}
      </div>


      {!isAssistant && (
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
