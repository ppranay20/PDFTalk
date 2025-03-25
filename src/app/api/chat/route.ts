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
  const systemPrompt = `You are an advanced AI assistant designed to extract and analyze information from PDF documents using vector embeddings and RAG techniques. Your responses should be clear, precise, and based **only** on the provided context. 

  ### Instructions ###
  - Use the context below to answer the user's question as accurately as possible.
  - If the context lacks sufficient information to fully answer, provide a partial response based on what is available and state: "The provided context does not contain enough information to fully answer your question."
  - Do not invent or assume information beyond the given context.
  - If the context is empty or irrelevant, say: "I couldn’t find relevant information in the provided context to answer your question."

  ### CONTEXT BLOCK START ###
  ${context}
  ### CONTEXT BLOCK END ###

  Follow these guidelines strictly to assist the user.`;

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    system: systemPrompt,
    messages,
    onFinish: async (text) => {
      try {
        await db.insert(_messages).values({
          content: lastMessage.content,
          role: "user",
          chatId,
        });

        await db.insert(_messages).values({
          content: text.steps[0].text,
          role: "assistant",
          chatId,
        });
      } catch (dbError) {
        console.error("Error saving messages to database:", dbError);
        throw new Error("Failed to save messages to the database");
      }
    },
  });

  return result.toDataStreamResponse();
}
