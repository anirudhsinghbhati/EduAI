
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BarChart, Users, UserCheck } from "lucide-react";
import { AttendanceCapture } from "./components/attendance-capture";
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
  const [attendanceSummary, setAttendanceSummary] = useState({ present: 94, absent: 6 });

  useEffect(() => {
     const loadRosterData = () => {
        try {
            const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
            const rosterData = savedRoster ? JSON.parse(savedRoster) : initialRoster;
            setRoster(rosterData);
            generateMockActivity(rosterData);
        } catch (error) {
            console.error("Failed to load roster from localStorage", error);
            setRoster(initialRoster);
            generateMockActivity(initialRoster);
        }
    };
    
    // Generate mock data based on the loaded roster
    const generateMockActivity = (currentRoster: ClassGroup[]) => {
      const allStudents = currentRoster.flatMap(cg => cg.students.map(s => ({ ...s, className: cg.name })));
      const statuses: ('Present' | 'Absent' | 'Late')[] = ['Present', 'Absent', 'Late'];
      
      if (allStudents.length === 0) {
        setRecentActivity([]);
        setAttendanceSummary({ present: 100, absent: 0 });
        return;
      }

      // Shuffle students for variety
      const shuffledStudents = [...allStudents].sort(() => 0.5 - Math.random());
      
      const activity: ActivityLog[] = shuffledStudents.slice(0, 5).map(student => ({
        student: student,
        className: student.className,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: `2023-10-${Math.floor(Math.random() * 5) + 20}`
      }));
      setRecentActivity(activity);

      // Update summary based on mock data
      const presentCount = activity.filter(a => a.status === 'Present' || a.status === 'Late').length;
      const totalCount = activity.length > 0 ? activity.length : 1;
      const presentPercentage = Math.round((presentCount / totalCount) * 100);
      setAttendanceSummary({ present: presentPercentage, absent: 100 - presentPercentage });
    };

    loadRosterData();

    // Listen for updates from other components like Admin Roster
     window.addEventListener('rosterUpdated', loadRosterData);

    return () => {
        window.removeEventListener('rosterUpdated', loadRosterData);
    };
  }, []);
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
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
      
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-primary" />
            Class Averages
          </CardTitle>
          <CardDescription>Overall performance snapshot.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {roster.map(classGroup => (
              <div key={classGroup.id} className="space-y-2">
                <div className="flex justify-between"><p>{classGroup.name}</p><p>{Math.floor(Math.random() * 20) + 75}%</p></div>
                <Progress value={Math.floor(Math.random() * 20) + 75} />
              </div>
            ))}
            {roster.length === 0 && <p className="text-sm text-muted-foreground text-center">No classes found.</p>}
        </CardContent>
      </Card>

      <AttendanceCapture />
      
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Recent Student Activity
          </CardTitle>
          <CardDescription>
            Overview of recent attendance and submissions.
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
             {recentActivity.map(log => (
                <TableRow key={log.student.id}>
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
             ))}
             {recentActivity.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
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
