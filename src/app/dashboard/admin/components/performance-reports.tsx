
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PerformanceRecord, initialPerformanceData } from "@/app/lib/performance";

const LOCAL_STORAGE_KEY = 'performanceRecords';

export function PerformanceReports() {
  const [averageGrade, setAverageGrade] = useState(0);

  useEffect(() => {
    try {
      const savedRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
      const records: PerformanceRecord[] = savedRecords ? JSON.parse(savedRecords) : initialPerformanceData;
      
      if (records.length > 0) {
        const total = records.reduce((sum, record) => sum + record.grade, 0);
        const avg = Math.round(total / records.length);
        setAverageGrade(avg);
      }
    } catch (error) {
      console.error("Failed to load performance data", error);
      setAverageGrade(85); // Fallback
    }
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-primary" />
          Performance
        </CardTitle>
        <CardDescription>Review academic reports and student grades.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
            <span className="font-medium">School Average</span>
            <span className="text-2xl font-bold">{averageGrade}%</span>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href="/dashboard/admin/performance">
            View Reports
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
