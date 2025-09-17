
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemAnnouncements } from "./components/system-announcements";
import { StudentRoster } from "./components/student-roster";
import { PlatformAnalytics } from "./components/platform-analytics";
import { Users, Activity, UserCheck } from "lucide-react";
import { studentRoster as initialRoster, type ClassGroup } from "@/app/lib/student-roster";

const LOCAL_STORAGE_KEY = 'studentRoster';

// Helper function to create a stable but pseudo-random number from a string (e.g., date)
const pseudoRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};


export default function AdminDashboardPage() {
  const [studentCount, setStudentCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [avgAttendance, setAvgAttendance] = useState(0);
  const [activeTeachers, setActiveTeachers] = useState(0);

  const updateDashboardStats = () => {
      try {
          const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
          const roster: ClassGroup[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
          
          const totalStudents = roster.reduce((total, classGroup) => {
              if (classGroup && Array.isArray(classGroup.students)) {
                  return total + classGroup.students.length;
              }
              return total;
          }, 0);

          const totalClasses = roster.length;

          setStudentCount(totalStudents);
          setClassCount(totalClasses);

          // Generate stable, dynamic mock data based on roster size
          const today = new Date().toISOString().slice(0, 10); // Seed for today's data
          const seed = `${today}-${totalStudents}-${totalClasses}`;
          const randomNumber = pseudoRandom(seed);
          
          // Calculate dynamic but stable "Average Attendance"
          const attendance = 85 + (randomNumber % 11); // Stable attendance between 85-95%
          setAvgAttendance(attendance);
          
          // Calculate dynamic but stable "Active Teachers"
          const teachers = totalClasses + Math.floor(totalClasses / 2) + (randomNumber % 5);
          setActiveTeachers(teachers);

      } catch (error) {
          console.error("Failed to load or parse roster from localStorage", error);
          setStudentCount(0);
          setClassCount(0);
          setAvgAttendance(88); // Fallback
          setActiveTeachers(5); // Fallback
      }
  };

  useEffect(() => {
    updateDashboardStats(); // Initial count

    // Listen for custom event when roster is updated in another component
    const handleRosterUpdate = () => {
        updateDashboardStats();
    };
    window.addEventListener('rosterUpdated', handleRosterUpdate);

    // Also use an interval as a fallback to ensure sync if the event fails
    const interval = setInterval(updateDashboardStats, 2000);

    return () => {
        window.removeEventListener('rosterUpdated', handleRosterUpdate);
        clearInterval(interval);
    };
  }, []);

  const stats = [
    { title: "Total Students", value: studentCount.toString(), icon: Users },
    { title: "Average Attendance", value: `${avgAttendance}%`, icon: Activity },
    { title: "Teachers Active", value: activeTeachers.toString(), icon: UserCheck },
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <StudentRoster />
        </div>
        <div className="lg:col-span-1">
            <SystemAnnouncements />
        </div>
      </div>
      <div>
        <PlatformAnalytics studentCount={studentCount} teacherCount={activeTeachers} />
      </div>
    </div>
  );
}
