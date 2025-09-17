
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TeacherManagement() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-primary" />
          Teacher Management
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <Button asChild className="w-full">
          <Link href="/dashboard/admin/teachers">
            Manage Teachers
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
