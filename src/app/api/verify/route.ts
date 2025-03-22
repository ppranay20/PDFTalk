import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables."
    );
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(req: NextRequest) {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      await req.json();

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "payment verification failed", isOk: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "payment verified successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("An Error occured:", error);
    return NextResponse.json({ error: "Payment Failed" }, { status: 200 });
  }
}
