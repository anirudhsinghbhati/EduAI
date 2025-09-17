
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight, FileText, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studentRoster as initialRoster, type ClassGroup } from "@/app/lib/student-roster";
import { type EnrollmentApplication, initialEnrollmentData } from "@/app/lib/enrollment";
import { type PerformanceRecord, initialPerformanceData } from "@/app/lib/performance";

const LOCAL_STORAGE_STUDENT_KEY = 'studentRoster';
const LOCAL_STORAGE_ENROLLMENT_KEY = 'enrollmentRecords';
const LOCAL_STORAGE_PERFORMANCE_KEY = 'performanceRecords';

export function StudentManagement() {
  const [studentCount, setStudentCount] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [averageGrade, setAverageGrade] = useState(0);

  const updateStats = () => {
    try {
      // Student Count
      const savedRoster = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
      const roster: ClassGroup[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
      const totalStudents = roster.reduce((total, classGroup) => total + (classGroup.students?.length || 0), 0);
      setStudentCount(totalStudents);

      // Pending Enrollments
      const savedEnrollments = localStorage.getItem(LOCAL_STORAGE_ENROLLMENT_KEY);
      const enrollments: EnrollmentApplication[] = savedEnrollments ? JSON.parse(savedEnrollments) : initialEnrollmentData;
      const pending = enrollments.filter(r => r.status === 'Pending').length;
      setPendingApplications(pending);

      // Average Grade
      const savedPerformances = localStorage.getItem(LOCAL_STORAGE_PERFORMANCE_KEY);
      const performances: PerformanceRecord[] = savedPerformances ? JSON.parse(savedPerformances) : initialPerformanceData;
      if (performances.length > 0) {
        const total = performances.reduce((sum, record) => sum + record.grade, 0);
        const avg = Math.round(total / performances.length);
        setAverageGrade(avg);
      }
    } catch (error) {
      console.error("Failed to load student-related data from localStorage", error);
      // Fallback values
      setStudentCount(initialRoster.reduce((total, classGroup) => total + (classGroup.students?.length || 0), 0));
      setPendingApplications(initialEnrollmentData.filter(r => r.status === 'Pending').length);
      setAverageGrade(85);
    }
  };

  useEffect(() => {
    updateStats();
    
    // Listen for updates from any of the relevant pages
    const eventListeners = ['rosterUpdated', 'enrollmentUpdated', 'performanceUpdated'];
    eventListeners.forEach(event => window.addEventListener(event, updateStats));
    const interval = setInterval(updateStats, 2000); // Fallback polling

    return () => {
      eventListeners.forEach(event => window.removeEventListener(event, updateStats));
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Student Hub
        </CardTitle>
        <CardDescription>Manage records, enrollment, and performance.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
         <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium flex items-center gap-2"><Users className="w-4 h-4" /> Total Students</span>
                <span className="text-xl font-bold">{studentCount}</span>
            </div>
             <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium flex items-center gap-2"><FileText className="w-4 h-4" /> Pending Enrollments</span>
                <span className="text-xl font-bold text-amber-600">{pendingApplications}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium flex items-center gap-2"><BarChart2 className="w-4 h-4" /> School Average</span>
                <span className="text-xl font-bold">{averageGrade}%</span>
            </div>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href="/dashboard/admin/roster">
            Manage All Students
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
