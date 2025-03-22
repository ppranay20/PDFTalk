"use client";
import { Chat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
// import SubscriptionButton from "./SubscriptionButton";f

interface Chats {
  chats: Chat[];
  chatId: number;
}

const ChatSideBar = ({ chats, chatId }: Chats) => {
  const [loading, setLoading] = React.useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/create-order", { method: "POST" });
      const { orderId } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 100 * 100,
        currency: "INR",
        name: "CHAT PDF",
        description: "TEST Transaction",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
           };

           const result = await fetch('/api/verify', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
           });

           const res = await result.json();
           if(res.isOk) {
            alert("Payment Success");
           } else {
            alert(res.message);
           }
        },
        prefill: {
          name: "John Doe",
          email: "jogn@gmail.com",
          contact: "99999999",
        },
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function(response: any) {
        alert(response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-4 overflow-y-scroll text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
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
      <div>
        <Button disabled={loading} onClick={handlePayment}>
          Payment
        </Button>
      </div>
    </div>
  );
};

export default ChatSideBar;
