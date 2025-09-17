
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StudentManagement() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Student Management
        </CardTitle>
        <CardDescription>Manage student profiles and class groups.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
         <p className="text-center text-muted-foreground mb-4">
          Add, remove, and view detailed student records.
        </p>
        <Button asChild className="mt-auto w-full">
          <Link href="/dashboard/admin/roster">
            Manage Students
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
