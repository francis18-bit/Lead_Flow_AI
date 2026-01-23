'use client';

import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { sendMessage } from '@/app/actions';
import ChatMessage from './chat-message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate a stable user ID for the session on the client
    setUserId(crypto.randomUUID());

    // Set an initial welcome message
    setMessages([
        { 
            id: 'init', 
            role: 'assistant', 
            content: 'Hello! I am LeadFlow AI. How can I assist you with your sales and lead qualification needs today?' 
        }
    ]);
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading || !userId) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setInput('');

    const response = await sendMessage(userId, userMessage);
    
    if ('error' in response) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.error,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } else {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.output,
        action: response.action,
        calendarLink: response.calendarLink,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-6 p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <ChatMessage isLoading />}
        </div>
      </ScrollArea>
      <div className="border-t bg-card p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            name="message"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            autoComplete="off"
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? (
                <LoaderCircle className="animate-spin" />
            ) : (
                <Send />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
