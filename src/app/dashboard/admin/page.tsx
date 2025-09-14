import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemAnnouncements } from "./components/system-announcements";
import { StudentRoster } from "./components/student-roster";
import { BarChart, Users, Activity } from "lucide-react";

const stats = [
  { title: "Total Students", value: "1,250", icon: Users },
  { title: "Average Attendance", value: "93%", icon: Activity },
  { title: "Teachers Active", value: "58", icon: Users },
];

export default function AdminDashboardPage() {
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
