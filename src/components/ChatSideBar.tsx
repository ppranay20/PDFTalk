"use client";
import { Chat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface Chats {
  chats: Chat[];
  chatId: number;
}

const ChatSideBar = ({ chats, chatId }: Chats) => {
  
  return (
    <div className="h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="mt-4 h-[calc(100vh-100px)]">
        <div className="flex flex-col gap-2 w-full">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn("rounded-lg p-3 text-slate-300 flex items", {
                  "bg-blue-600 text-white": chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                })}
              >
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Link className="flex justify-center" href={"/"}>
        Home
      </Link>
    </div>
  );
};

export default ChatSideBar;
