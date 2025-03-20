import { getS3Url } from "@/actions/uploadToS3";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecode } from "@/lib/pinecode";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { fileKey, fileName } = body;
    const pages = await loadS3IntoPinecode(fileKey);
    const url = await getS3Url(fileKey);
    const chatId = await db
      .insert(chats)
      .values({
        fileKey,
        pdfName: fileName,
        pdfUrl: url,
        userId: userId,
      })
      .returning({
        insertedId: chats.id,
      });

    return NextResponse.json({ chatId: chatId[0].insertedId }, { status: 200 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
