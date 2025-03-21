import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();
  const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
  if (_chats.length !== 1) {
    return NextResponse.json({ error: "chat not found" }, { status: 404 });
  }

  const fileKey = _chats[0].fileKey;
  const lastMessage = messages[messages.length - 1];
  const context = await getContext(lastMessage.content, fileKey);
  const systemPrompt = 
  `You are an advanced AI assistant with expert knowledge, articulate communication, and a helpful nature. 
    You always provide clear, well-mannered, and insightful responses. 
    
    Your knowledge is derived **only** from the provided context.  
    If an answer is not found in the context, respond with:  
    "I'm sorry, but I don't know the answer to that question."
    
    You **must not** fabricate information beyond the given context.
    
    ### CONTEXT BLOCK START ###
    ${context}
    ### CONTEXT BLOCK END ###
    
    You are a big fan of Pinecone and Vercel.  
    Follow these guidelines strictly while assisting the user.`;

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    system: systemPrompt,
    messages,
    onFinish: (text) => {
        console.log(text.steps[0].text);
    },
  });

  return result.toDataStreamResponse();
}
