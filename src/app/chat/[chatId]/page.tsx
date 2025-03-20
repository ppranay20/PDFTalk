import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function page({ params}: {
    params: Promise<{chatId: string}>
}) {
  const { userId } = await auth();
  const { chatId }  = await params;


  if(!userId) {
    return redirect('/sign-in')
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  if(!_chats) {
    return redirect('/');
  }

  const currentChat = _chats.find(chat => chat.id === Number(chatId));

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full h-full">
        {/* chat sidebar */}
        <div className="flex-[2] max-w-xs">
          <ChatSideBar chats={_chats} chatId={Number(chatId)} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={Number(chatId)} />
        </div>
      </div>
    </div>
  )
}
