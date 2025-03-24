'use client'

import { Chat } from "@/lib/db/schema"
import { Button } from "./ui/button"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ChatButton({ previousChats }: {
    previousChats: Chat[]
}) {
    const router = useRouter();
    const navigateToChat = () => {
        if(previousChats) {
            router.push(`/chat/${previousChats[0].id}`);
        } else {
            toast.error("Create a chat first");
        }
    }

  return (
    <Button className="cursor-pointer" onClick={navigateToChat}>
        Go to Chats
    </Button>
  )
}
