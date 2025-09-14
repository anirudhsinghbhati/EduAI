
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemAnnouncements } from "./components/system-announcements";
import { StudentRoster } from "./components/student-roster";
import { BarChart, Users, Activity } from "lucide-react";
import { studentRoster as initialRoster, type Student } from "@/app/lib/student-roster";

const LOCAL_STORAGE_KEY = 'studentRoster';

export default function AdminDashboardPage() {
  const [studentCount, setStudentCount] = useState(initialRoster.length);

  useEffect(() => {
    try {
      const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedRoster) {
        const roster: Student[] = JSON.parse(savedRoster);
        setStudentCount(roster.length);
      }
    } catch (error) {
      console.error("Failed to load roster from localStorage for count", error);
      setStudentCount(initialRoster.length);
    }

    // Listen for changes to the roster from other components
    const handleStorageChange = () => {
        const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedRoster) {
            setStudentCount(JSON.parse(savedRoster).length);
        }
    };
    window.addEventListener('storage', handleStorageChange);
    // A custom event could also be used here if storage event proves unreliable for same-page updates.
    
    // A simple polling fallback to ensure the count updates if the storage event doesn't fire
    const interval = setInterval(() => {
        handleStorageChange();
    }, 1000);


    return () => {
        window.removeEventListener('storage', handleStorageChange);
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
