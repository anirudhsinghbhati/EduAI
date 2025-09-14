
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListChecks } from "lucide-react";

export function ManualAttendance() {
  return (
    <Card className="lg:col-span-1 flex flex-col justify-center items-center p-6 bg-secondary/50 border-dashed border-secondary-foreground/20">
      <div className="text-center">
        <ListChecks className="mx-auto h-12 w-12 text-secondary-foreground mb-4" />
        <CardTitle>Manual Attendance</CardTitle>
        <CardDescription className="mt-2">Mark attendance for a class student by student.</CardDescription>
        <Button className="mt-4" asChild>
            <Link href="/dashboard/teacher/manual-attendance">Mark Attendance</Link>
        </Button>
      </div>
    </Card>
  );
}
