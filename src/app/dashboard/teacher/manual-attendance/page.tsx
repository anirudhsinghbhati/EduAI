
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { studentRoster as initialRoster, type ClassGroup } from "@/app/lib/student-roster";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ListChecks } from "lucide-react";

const LOCAL_STORAGE_KEY = 'studentRoster';

type AttendanceStatus = "Present" | "Absent" | "Late";

export default function ManualAttendancePage() {
  const [roster, setRoster] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
      const rosterData = savedRoster ? JSON.parse(savedRoster) : initialRoster;
      setRoster(rosterData);
    } catch (error)
 {
      console.error("Failed to load roster from localStorage", error);
      setRoster(initialRoster);
    }
  }, []);
  
  const selectedClass = roster.find(c => c.id === selectedClassId);
  const studentsInClass = selectedClass?.students || [];

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    if (!selectedClass) {
        toast({
            variant: "destructive",
            title: "No Class Selected",
            description: "Please select a class to submit attendance.",
        });
        return;
    }
    // In a real app, this would be saved to a database.
    console.log(`Attendance for ${selectedClass.name}:`, attendance);
    toast({
      title: "✅ Attendance Submitted",
      description: `Attendance for ${selectedClass.name} has been recorded.`,
    });
  };
  
  useEffect(() => {
    // Reset attendance state when class changes
    setAttendance({});
  }, [selectedClassId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" />
            Manual Attendance
        </CardTitle>
        <CardDescription>Mark student attendance for a selected class.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="class-select-manual">Select Class</Label>
                <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                    <SelectTrigger id="class-select-manual">
                        <SelectValue placeholder="Choose a class..." />
                    </SelectTrigger>
                    <SelectContent>
                        {roster.map((classGroup) => (
                            <SelectItem key={classGroup.id} value={classGroup.id}>
                                {classGroup.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <ScrollArea className="h-96 border rounded-md">
                <div className="p-4 space-y-4">
                {studentsInClass.length > 0 ? (
                    studentsInClass.map(student => (
                        <div key={student.id} className="flex items-center justify-between">
                            <p className="font-medium">{student.name}</p>
                            <RadioGroup 
                                className="flex gap-4" 
                                value={attendance[student.id] || "Present"}
                                onValueChange={(value) => handleStatusChange(student.id, value as AttendanceStatus)}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Present" id={`${student.id}-present`} />
                                    <Label htmlFor={`${student.id}-present`}>Present</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Absent" id={`${student.id}-absent`} />
                                    <Label htmlFor={`${student.id}-absent`}>Absent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Late" id={`${student.id}-late`} />
                                    <Label htmlFor={`${student.id}-late`}>Late</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-sm text-muted-foreground py-10">
                        {selectedClassId ? "No students in this class." : "Please select a class to begin."}
                    </p>
                )}
                </div>
            </ScrollArea>
            <Button onClick={handleSubmit} disabled={!selectedClassId || studentsInClass.length === 0}>Submit Attendance</Button>
        </div>
      </CardContent>
    </Card>
  );
}
