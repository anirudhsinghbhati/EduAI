
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <Button asChild className="w-full">
          <Link href="/dashboard/admin/roster">
            Manage Students
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
