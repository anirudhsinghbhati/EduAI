
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, UserCheck } from "lucide-react";
import { AttendanceCapture } from "./components/attendance-capture";
import { ManualAttendance } from "./components/manual-attendance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { studentRoster as initialRoster, type ClassGroup, type Student } from "@/app/lib/student-roster";

const LOCAL_STORAGE_KEY = 'studentRoster';

type ActivityLog = {
  student: Student;
  className: string;
  status: 'Present' | 'Absent' | 'Late';
  date: string;
};

const statusVariants: { [key: string]: { className: string, variant?: "outline" | "destructive" | "default" | "secondary" } } = {
    'Present': { className: 'text-green-500 border-green-500', variant: 'outline' },
    'Absent': { className: '', variant: 'destructive' },
    'Late': { className: 'text-yellow-500 border-yellow-500', variant: 'outline' },
};

export default function TeacherDashboardPage() {
  const [roster, setRoster] = useState<ClassGroup[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [attendanceSummary, setAttendanceSummary] = useState({ present: 0, absent: 0 });
  const [classAverages, setClassAverages] = useState<Record<string, number>>({});

  const generateMockData = (currentRoster: ClassGroup[]) => {
    const allStudents = currentRoster.flatMap(cg => 
        (cg.students || []).map(s => ({ ...s, className: cg.name }))
    );
    
    if (allStudents.length === 0) {
      setRecentActivity([]);
      setAttendanceSummary({ present: 100, absent: 0 });
      setClassAverages({});
      return;
    }

    // Generate stable but random-looking data
    const statuses: ('Present' | 'Absent' | 'Late')[] = ['Present', 'Absent', 'Late', 'Present', 'Present'];
    const activity: ActivityLog[] = allStudents.slice(0, 5).map((student, index) => ({
      student: student,
      className: student.className,
      status: statuses[index % statuses.length],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
    setRecentActivity(activity);

    const presentCount = allStudents.filter((_, i) => (i % 10) !== 0).length; // ~90% attendance
    const totalCount = allStudents.length;
    const presentPercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 100;
    setAttendanceSummary({ present: presentPercentage, absent: 100 - presentPercentage });
    
    const averages: Record<string, number> = {};
    currentRoster.forEach(cg => {
        // Simple hash to create a pseudo-random but stable average
        const avg = cg.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 20 + 78;
        averages[cg.id] = avg;
    });
    setClassAverages(averages);
  };

  const loadDashboardData = () => {
    try {
      const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
      const rosterData: ClassGroup[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
      setRoster(rosterData);
      generateMockData(rosterData);
    } catch (error) {
      console.error("Failed to load dashboard data from localStorage", error);
      setRoster(initialRoster);
      generateMockData(initialRoster);
    }
  };

  useEffect(() => {
    loadDashboardData();
    // This event listener will trigger a reload if the roster is updated in another component (e.g., Admin page).
    window.addEventListener('rosterUpdated', loadDashboardData);
    
    return () => {
      window.removeEventListener('rosterUpdated', loadDashboardData);
    };
  }, []);
  
  return (
    <div className="grid gap-6">
       <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Today&apos;s Attendance
            </CardTitle>
            <CardDescription>Summary for all classes today.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-around text-center">
            <div>
                <p className="text-3xl font-bold">{attendanceSummary.present}%</p>
                <p className="text-sm text-muted-foreground">Present</p>
            </div>
            <div>
                <p className="text-3xl font-bold">{attendanceSummary.absent}%</p>
                <p className="text-sm text-muted-foreground">Absent</p>
            </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-primary" />
                Class Averages
            </CardTitle>
            <CardDescription>Overall performance snapshot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {roster.length > 0 ? roster.map(classGroup => (
                <div key={classGroup.id} className="space-y-2">
                    <div className="flex justify-between"><p>{classGroup.name}</p><p>{classAverages[classGroup.id] || 0}%</p></div>
                    <Progress value={classAverages[classGroup.id] || 0} />
                </div>
                )) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No classes found. Add classes in the admin panel.</p>
                )}
            </CardContent>
        </Card>

        <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:col-span-2">
            <AttendanceCapture />
            <ManualAttendance />
        </div>
      </div>

      <Card className="lg:col-span-3">
          <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Recent Student Activity
          </CardTitle>
          <CardDescription>
              Overview of recent attendance marks across your classes.
          </CardDescription>
          </CardHeader>
          <CardContent>
          <Table>
              <TableHeader>
              <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
              {recentActivity.length > 0 ? recentActivity.map((log, index) => (
                  <TableRow key={`${log.student.id}-${index}`}>
                      <TableCell className="font-medium">{log.student.name}</TableCell>
                      <TableCell>{log.className}</TableCell>
                      <TableCell>
                      <Badge 
                          variant={statusVariants[log.status].variant}
                          className={statusVariants[log.status].className}
                      >
                          {log.status}
                      </Badge>
                      </TableCell>
                      <TableCell>{log.date}</TableCell>
                  </TableRow>
              )) : (
                  <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                          No recent activity to display.
                      </TableCell>
                  </TableRow>
              )}
              </TableBody>
          </Table>
          </CardContent>
      </Card>
    </div>
  );
}
