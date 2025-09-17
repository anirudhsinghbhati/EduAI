
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventsNotices() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-primary" />
          Events & Notices
        </CardTitle>
        <CardDescription>Manage academic calendar, events, and announcements.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <Button asChild className="w-full mt-auto">
          <Link href="/dashboard/admin/events">
            Manage Events
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
