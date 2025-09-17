
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart2 } from "lucide-react";
import {
  initialPerformanceData,
  type PerformanceRecord,
} from "@/app/lib/performance";
import {
  studentRoster as initialClassRoster,
  type ClassGroup,
} from "@/app/lib/student-roster";
import { Badge } from "@/components/ui/badge";

const LOCAL_STORAGE_PERFORMANCE_KEY = "performanceRecords";
const LOCAL_STORAGE_STUDENT_KEY = "studentRoster";

const getGradeBadgeVariant = (grade: number) => {
  if (grade >= 90) return "default";
  if (grade >= 75) return "secondary";
  if (grade >= 60) return "outline";
  return "destructive";
};

export default function PerformancePage() {
  const [performanceRecords, setPerformanceRecords] = useState<
    PerformanceRecord[]
  >([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("all");

  useEffect(() => {
    try {
      const savedPerformances = localStorage.getItem(
        LOCAL_STORAGE_PERFORMANCE_KEY
      );
      setPerformanceRecords(
        savedPerformances
          ? JSON.parse(savedPerformances)
          : initialPerformanceData
      );

      const savedClasses = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
      setClasses(
        savedClasses ? JSON.parse(savedClasses) : initialClassRoster
      );
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setPerformanceRecords(initialPerformanceData);
      setClasses(initialClassRoster);
    }
  }, []);

  const filteredRecords = useMemo(() => {
    if (selectedClassId === "all") {
      return performanceRecords;
    }
    return performanceRecords.filter(
      (record) => record.classId === selectedClassId
    );
  }, [selectedClassId, performanceRecords]);

  const classAverages = useMemo(() => {
    const averages: Record<string, number> = {};
    classes.forEach(c => {
        const classRecords = performanceRecords.filter(r => r.classId === c.id);
        if (classRecords.length > 0) {
            const total = classRecords.reduce((sum, record) => sum + record.grade, 0);
            averages[c.id] = Math.round(total / classRecords.length);
        }
    });
    return averages;
  }, [performanceRecords, classes]);


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              Academic Performance
            </CardTitle>
            <CardDescription>
              View student grades and performance reports.
            </CardDescription>
          </div>
          <div className="w-full sm:w-64">
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by class..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} (Avg: {classAverages[c.id] || 'N/A'}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Term</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {record.studentName}
                  </TableCell>
                  <TableCell>{record.className}</TableCell>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>{record.teacherName}</TableCell>
                  <TableCell>{record.term}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getGradeBadgeVariant(record.grade)}>
                      {record.grade}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No performance records found for the selected class.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
