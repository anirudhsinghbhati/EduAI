
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeeManager() {
  // In a real app, this data would be fetched and calculated from an API
  const totalCollected = 1480000;
  const totalOutstanding = 336000;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Fee Management
        </CardTitle>
        <CardDescription>Track student fee payments and balances.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-medium">Collected (INR)</span>
                <span className="text-2xl font-bold text-green-600">₹{totalCollected.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-medium">Outstanding (INR)</span>
                <span className="text-2xl font-bold text-amber-600">₹{totalOutstanding.toLocaleString('en-IN')}</span>
            </div>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href="/dashboard/admin/fees">
            Manage Fees
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
