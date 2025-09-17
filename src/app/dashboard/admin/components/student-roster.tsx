
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight } from "lucide-react";
import { studentRoster as initialRoster, type ClassGroup } from "@/app/lib/student-roster";
import { Button } from "@/components/ui/button";

const LOCAL_STORAGE_KEY = 'studentRoster';

export function StudentRoster() {
  const [studentCount, setStudentCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    const updateStats = () => {
        try {
            const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
            const roster: ClassGroup[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
            
            const totalStudents = roster.reduce((total, classGroup) => total + (classGroup.students?.length || 0), 0);
            const totalClasses = roster.length;

            setStudentCount(totalStudents);
            setClassCount(totalClasses);
        } catch (error) {
            console.error("Failed to load roster from localStorage", error);
            setStudentCount(initialRoster.reduce((total, classGroup) => total + (classGroup.students?.length || 0), 0));
            setClassCount(initialRoster.length);
        }
    };
    
    updateStats();
    
    // Listen for updates from other components
    window.addEventListener('rosterUpdated', updateStats);
    const interval = setInterval(updateStats, 2000); // Fallback polling

    return () => {
        window.removeEventListener('rosterUpdated', updateStats);
        clearInterval(interval);
    };
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Student Roster
        </CardTitle>
        <CardDescription>Manage student profiles and class groups.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-medium">Total Students</span>
                <span className="text-2xl font-bold">{studentCount}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-medium">Total Classes</span>
                <span className="text-2xl font-bold">{classCount}</span>
            </div>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href="/dashboard/admin/roster">
            Manage Roster
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
