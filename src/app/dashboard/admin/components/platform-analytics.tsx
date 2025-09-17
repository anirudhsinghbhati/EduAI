
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as BarChartIcon } from "lucide-react";

const data = [
  { name: "Mon", students: 400, teachers: 24, admins: 5 },
  { name: "Tue", students: 300, teachers: 13, admins: 4 },
  { name: "Wed", students: 500, teachers: 48, admins: 8 },
  { name: "Thu", students: 478, teachers: 39, admins: 6 },
  { name: "Fri", students: 689, teachers: 48, admins: 9 },
  { name: "Sat", students: 139, teachers: 8, admins: 2 },
  { name: "Sun", students: 90, teachers: 3, admins: 1 },
];

export function PlatformAnalytics() {
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
