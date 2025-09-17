
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, ArrowRight } from "lucide-react";
import { teacherRoster as initialRoster, type Teacher } from "@/app/lib/teacher-roster";
import { Button } from "@/components/ui/button";

const LOCAL_STORAGE_KEY = 'teacherRoster';

export function TeacherRoster() {
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    const updateStats = () => {
        try {
            const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
            const roster: Teacher[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
            setTeacherCount(roster.length);
        } catch (error) {
            console.error("Failed to load teacher roster from localStorage", error);
            setTeacherCount(initialRoster.length);
        }
    };
    
    updateStats();
    
    // Listen for updates from other components
    window.addEventListener('teacherRosterUpdated', updateStats);
    const interval = setInterval(updateStats, 2000); // Fallback polling

    return () => {
        window.removeEventListener('teacherRosterUpdated', updateStats);
        clearInterval(interval);
    };
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-primary" />
          Teacher Roster
        </CardTitle>
        <CardDescription>Manage teacher profiles and subjects.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-medium">Total Teachers</span>
                <span className="text-2xl font-bold">{teacherCount}</span>
            </div>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href="/dashboard/admin/teachers">
            Manage Roster
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
