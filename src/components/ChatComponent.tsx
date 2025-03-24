"use client"
import { useChat } from '@ai-sdk/react';
import { Input } from './ui/input';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import MessageList from './MessageList';
import { useEffect, useRef } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function ChatComponent({ chatId}: {
    chatId: number
}) {
    const pathname = usePathname();
    const { data,isLoading } = useQuery({
        queryKey: ['messages',chatId],
        queryFn: async () => {
            const response = await fetch('/api/get-messages',{
                method: 'POST',
                body: JSON.stringify({chatId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            return data;
        },
        enabled: !!pathname,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: Infinity,
        gcTime: Infinity,
        retry: 1,
    });

    const { input, handleInputChange, handleSubmit, messages } = useChat({
        body: {
            chatId
        },
        initialMessages: data
    });

    const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
        scrollArea.scrollTo({
          top: scrollArea.scrollHeight,
          behavior: 'smooth',
        });
    }
  }, [messages]);

  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
        <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit"> 
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>

        <div ref={scrollAreaRef} className='py-4 flex-1 overflow-y-auto' id='message-container'>
            <MessageList messages={messages} isLoading={isLoading} />
        </div>


        <form onSubmit={handleSubmit} className='bg-white m-4'>
            <div className='flex'>
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Ask any question...'
                    className='w-full'
                />
                <Button className='bg-blue-600 ml-2'>
                    <Send className='w-4 h-4' />
                </Button>
            </div>
        </form>
    </div>
  )
}
