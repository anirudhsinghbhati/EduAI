
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type EnrollmentApplication, initialEnrollmentData } from "@/app/lib/enrollment";

const LOCAL_STORAGE_KEY = 'enrollmentRecords';

export function EnrollmentManager() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const updateStats = () => {
        try {
            const savedRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
            const records: EnrollmentApplication[] = savedRecords ? JSON.parse(savedRecords) : initialEnrollmentData;
            
            const pending = records.filter(r => r.status === 'Pending').length;
            setPendingCount(pending);

        } catch (error) {
            console.error("Failed to load enrollment data from localStorage", error);
            setPendingCount(initialEnrollmentData.filter(r => r.status === 'Pending').length);
        }
    };
    
    updateStats();
    
    // Listen for updates from other components
    window.addEventListener('enrollmentUpdated', updateStats);
    const interval = setInterval(updateStats, 2000); // Fallback polling

    return () => {
        window.removeEventListener('enrollmentUpdated', updateStats);
        clearInterval(interval);
    };
  }, []);


  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Enrollment
        </CardTitle>
        <CardDescription>Review and manage new student applications.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
                <Hourglass className="w-4 h-4 text-amber-600" />
                <span className="font-medium">Pending Applications</span>
            </div>
            <span className="text-2xl font-bold text-amber-600">{pendingCount}</span>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href="/dashboard/admin/enrollment">
            Manage Applications
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
