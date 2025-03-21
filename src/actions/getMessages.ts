'use server'

import { db } from "@/lib/db"
import { messages } from "@/lib/db/schema"
import { eq } from "drizzle-orm";

const getMessages = async (chatId: number) => {
    const _messages = await db.select().from(messages).where(eq(messages.chatId,chatId));
    return _messages;
}