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

export default function TeacherDashboardPage() {
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
            <p className="text-3xl font-bold">94%</p>
            <p className="text-sm text-muted-foreground">Present</p>
          </div>
          <div>
            <p className="text-3xl font-bold">6%</p>
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
            <div className="space-y-2">
              <div className="flex justify-between"><p>Grade 10 Math</p><p>82%</p></div>
              <Progress value={82} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><p>Grade 11 Physics</p><p>76%</p></div>
              <Progress value={76} />
            </div>
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
              <TableRow>
                <TableCell className="font-medium">Liam Johnson</TableCell>
                <TableCell>Grade 10 Math</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-green-500 border-green-500">Present</Badge>
                </TableCell>
                <TableCell>2023-10-23</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Olivia Smith</TableCell>
                <TableCell>Grade 11 Physics</TableCell>
                 <TableCell>
                  <Badge variant="destructive">Absent</Badge>
                </TableCell>
                <TableCell>2023-10-23</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Noah Williams</TableCell>
                <TableCell>Grade 10 Math</TableCell>
                 <TableCell>
                  <Badge variant="outline" className="text-yellow-500 border-yellow-500">Late</Badge>
                </TableCell>
                <TableCell>2023-10-23</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
