import ChatButton from "@/components/ChatButton";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const { userId } = await auth();
  const isAuth = !!userId;
  
  // get previous chats
  const previousChats = await db.select().from(chats);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-sky-300 to-sky-100  relative">
      <div className="flex justify-end m-5">
        <UserButton />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center text-center max-w-md w-full">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">PDF Talk</h1>
          </div>

          <div className="flex mt-2">
            {
              isAuth &&
                <ChatButton previousChats={previousChats} />
            }
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">
          Transform Your PDFs into Conversations with AI Magic!
          </p>
          <div className="w-full mt-4">
            {
              isAuth ? <FileUpload /> : 
              <Link href="/sign-in">
                <Button>
                  Login to get started
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
 