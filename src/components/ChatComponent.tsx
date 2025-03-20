"use client"
import { useChat } from '@ai-sdk/react';
import { Input } from './ui/input';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import MessageList from './MessageList';

export default function ChatComponent({ chatId}: {
    chatId: number
}) {
    const { input, handleInputChange, handleSubmit, messages } = useChat();

  return (
    <div className="relative max-h-screen overflow-scroll">
        <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit"> 
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>

        <MessageList messages={messages} isLoading={false} />

        <form onSubmit={handleSubmit} className='sticky bottom-0 inset-x-0 px-2 py-4 bg-white'>
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
