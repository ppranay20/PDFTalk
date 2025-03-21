"use client"
import { useChat } from '@ai-sdk/react';
import { Input } from './ui/input';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import MessageList from './MessageList';
import { useEffect } from 'react';

export default function ChatComponent({ chatId}: {
    chatId: number
}) {
    // Todo --> Fetch all chats and make this server component

    const { input, handleInputChange, handleSubmit, messages } = useChat({
        body: {
            chatId
        }
    });

    useEffect(() => {
        const messageContainer = document.getElementById('message-container');
        if(messageContainer) {
            messageContainer.scroll({
                top: messageContainer.scrollHeight,
                behavior: 'smooth'
            })
        }
    },[messages])

  return (
    <div className="relative max-h-screen overflow-scroll" id='message-container'>
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
