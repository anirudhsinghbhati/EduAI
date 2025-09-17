
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as BarChartIcon } from "lucide-react";

// Helper function to create a stable but pseudo-random number from a seed
const pseudoRandom = (seed: number) => {
    let hash = seed;
    hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
    hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
    hash = (hash >> 16) ^ hash;
    return Math.abs(hash);
};

// Generate dynamic but stable chart data based on user counts
const generateChartData = (studentCount: number, teacherCount: number) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const baseAdminCount = Math.max(1, Math.floor(teacherCount / 10));

    return days.map((day, index) => {
        const seed = studentCount + teacherCount + index;
        const studentMultiplier = [0.8, 0.7, 0.9, 0.85, 0.95, 0.2, 0.15][index];
        const teacherMultiplier = [0.9, 0.8, 1.0, 0.9, 1.0, 0.3, 0.2][index];
        
        const students = Math.floor(studentCount * studentMultiplier * (1 - (pseudoRandom(seed) % 15) / 100));
        const teachers = Math.floor(teacherCount * teacherMultiplier * (1 - (pseudoRandom(seed + 1) % 15) / 100));
        const admins = Math.floor(baseAdminCount * teacherMultiplier) + (pseudoRandom(seed + 2) % 3);

        return {
            name: day,
            students: Math.max(0, students),
            teachers: Math.max(0, teachers),
            admins: Math.max(0, admins),
        };
    });
};


export function PlatformAnalytics({ studentCount, teacherCount }: { studentCount: number; teacherCount: number }) {
  const data = generateChartData(studentCount, teacherCount);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChartIcon className="w-5 h-5 text-primary" />
          Platform Engagement
        </CardTitle>
        <CardDescription>Weekly active users by role.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                }}
                cursor={{ fill: 'hsl(var(--muted))' }}
            />
            <Legend iconSize={10} />
            <Bar dataKey="students" fill="hsl(var(--primary))" name="Students" radius={[4, 4, 0, 0]} />
            <Bar dataKey="teachers" fill="hsl(var(--accent))" name="Teachers" radius={[4, 4, 0, 0]} />
            <Bar dataKey="admins" fill="hsl(var(--secondary))" name="Admins" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
