
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemAnnouncements } from "./components/system-announcements";
import { StudentRoster } from "./components/student-roster";
import { BarChart, Users, Activity } from "lucide-react";
import { studentRoster as initialRoster, type ClassGroup } from "@/app/lib/student-roster";

const LOCAL_STORAGE_KEY = 'studentRoster';

export default function AdminDashboardPage() {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const calculateTotalStudents = (roster: ClassGroup[]) => {
        return roster.reduce((total, classGroup) => {
            // Add a check to ensure classGroup.students is an array
            if (classGroup && Array.isArray(classGroup.students)) {
                return total + classGroup.students.length;
            }
            return total;
        }, 0);
    };

    const updateStudentCount = () => {
        try {
            const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
            const roster: ClassGroup[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
            setStudentCount(calculateTotalStudents(roster));
        } catch (error) {
            console.error("Failed to load or parse roster from localStorage", error);
            setStudentCount(calculateTotalStudents(initialRoster));
        }
    };
    
    updateStudentCount(); // Initial count

    // A custom event listener to handle updates from the StudentRoster component
    const handleRosterUpdate = () => {
        updateStudentCount();
    };

    window.addEventListener('rosterUpdated', handleRosterUpdate);
    
    // A simple polling fallback to ensure the count updates if the event doesn't fire
    const interval = setInterval(updateStudentCount, 1000);


    return () => {
        window.removeEventListener('rosterUpdated', handleRosterUpdate);
        clearInterval(interval);
    };
  }, []);

  const stats = [
    { title: "Total Students", value: studentCount.toString(), icon: Users },
    { title: "Average Attendance", value: "93%", icon: Activity },
    { title: "Teachers Active", value: "58", icon: Users },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StudentRoster />
        <SystemAnnouncements />
      </div>
    </div>
  );
}
