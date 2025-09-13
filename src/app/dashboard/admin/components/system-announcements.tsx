"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SystemAnnouncements() {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleBroadcast = () => {
    if (message.trim()) {
      // In a real app, this would call an API
      console.log("Broadcasting message:", message);
      toast({
        title: "📢 Announcement Sent",
        description: "Your message has been broadcast to all users.",
      });
      setMessage("");
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-primary" />
          System Announcements
        </CardTitle>
        <CardDescription>Broadcast a message to all users.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-8rem)]">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your announcement here..."
          className="flex-1"
        />
        <Button onClick={handleBroadcast} className="mt-4 w-full">
          Broadcast Announcement
        </Button>
      </CardContent>
    </Card>
  );
}
