
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemAnnouncements } from "./components/system-announcements";
import { StudentManagement } from "./components/student-management";
import { TeacherManagement } from "./components/teacher-management";
import { TimetableManager } from "./components/timetable-manager";
import { PlatformAnalytics } from "./components/platform-analytics";
import { Users, Activity, UserCheck } from "lucide-react";
import { studentRoster as initialRoster, type ClassGroup } from "@/app/lib/student-roster";
import { teacherRoster as initialTeacherRoster, type Teacher } from "@/app/lib/teacher-roster";
import { FeeManager } from "./components/fee-manager";

const LOCAL_STORAGE_STUDENT_KEY = 'studentRoster';
const LOCAL_STORAGE_TEACHER_KEY = 'teacherRoster';

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
  const [teacherCount, setTeacherCount] = useState(0);
  const [avgAttendance, setAvgAttendance] = useState(0);

  const updateDashboardStats = () => {
      try {
          const savedStudentRoster = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
          const studentRoster: ClassGroup[] = savedStudentRoster ? JSON.parse(savedStudentRoster) : initialRoster;
          
          const totalStudents = studentRoster.reduce((total, classGroup) => {
              if (classGroup && Array.isArray(classGroup.students)) {
                  return total + classGroup.students.length;
              }
              return total;
          }, 0);

          const savedTeacherRoster = localStorage.getItem(LOCAL_STORAGE_TEACHER_KEY);
          const teacherRoster: Teacher[] = savedTeacherRoster ? JSON.parse(savedTeacherRoster) : initialTeacherRoster;
          const totalTeachers = teacherRoster.length;

          setStudentCount(totalStudents);
          setTeacherCount(totalTeachers);

          // Generate stable, dynamic mock data based on roster size
          const today = new Date().toISOString().slice(0, 10); // Seed for today's data
          const seed = `${today}-${totalStudents}-${totalTeachers}`;
          const randomNumber = pseudoRandom(seed);
          
          // Calculate dynamic but stable "Average Attendance"
          const attendance = 85 + (randomNumber % 11); // Stable attendance between 85-95%
          setAvgAttendance(attendance);

      } catch (error) {
          console.error("Failed to load or parse data from localStorage", error);
          setStudentCount(0);
          setTeacherCount(0);
          setAvgAttendance(88); // Fallback
      }
  };

  useEffect(() => {
    updateDashboardStats(); // Initial count

    // Listen for custom event when roster is updated in another component
    const handleRosterUpdate = () => {
        updateDashboardStats();
    };
    window.addEventListener('rosterUpdated', handleRosterUpdate);
    window.addEventListener('teacherRosterUpdated', handleRosterUpdate);

    // Also use an interval as a fallback to ensure sync if the event fails
    const interval = setInterval(updateDashboardStats, 2000);

    return () => {
        window.removeEventListener('rosterUpdated', handleRosterUpdate);
        window.removeEventListener('teacherRosterUpdated', handleRosterUpdate);
        clearInterval(interval);
    };
  }, []);

  const stats = [
    { title: "Total Students", value: studentCount.toString(), icon: Users },
    { title: "Average Attendance", value: `${avgAttendance}%`, icon: Activity },
    { title: "Teachers Active", value: teacherCount.toString(), icon: UserCheck },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Row: Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Middle Row: Management Cards & Announcements */}
      <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 grid gap-6 grid-cols-1 md:grid-cols-2">
            <StudentManagement />
            <TeacherManagement />
            <TimetableManager />
            <FeeManager />
          </div>
          <div className="lg:col-span-2">
            <SystemAnnouncements />
          </div>
      </div>
      
      {/* Bottom Row: Analytics */}
      <div>
        <PlatformAnalytics studentCount={studentCount} teacherCount={teacherCount} />
      </div>
    </div>
  );
}
