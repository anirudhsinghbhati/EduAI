
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TimetableManager() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          Daily Timetable
        </CardTitle>
        <CardDescription>Manage class schedules for the week.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <p className="text-center text-muted-foreground mb-4">
          View and edit the master timetable for all classes.
        </p>
        <Button asChild className="mt-auto w-full">
          <Link href="/dashboard/admin/timetable">
            Manage Timetable
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
