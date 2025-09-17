
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportsAnalytics() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AreaChart className="w-5 h-5 text-primary" />
          Reports & Analytics
        </CardTitle>
        <CardDescription>Access detailed reports and school-wide analytics.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <Button asChild className="w-full mt-auto">
          <Link href="/dashboard/admin/reports">
            View Reports
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
