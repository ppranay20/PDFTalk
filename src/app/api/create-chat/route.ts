import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { fileKey, fileName } = body;
        return NextResponse.json({
            messages: "response"
        })

    } catch (error) {
        console.error("Error: ",error);
        return NextResponse.json(
            { error: "Internal server error"},
            { status: 500 }
        ) 
    }
}