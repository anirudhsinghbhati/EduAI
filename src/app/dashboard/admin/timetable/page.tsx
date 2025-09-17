
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialTimetable, type TimetableEntry } from "@/app/lib/timetable";
import { studentRoster as initialClassRoster, type ClassGroup } from "@/app/lib/student-roster";
import { teacherRoster as initialTeacherRoster, type Teacher } from "@/app/lib/teacher-roster";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LOCAL_STORAGE_TIMETABLE_KEY = 'timetable';
const LOCAL_STORAGE_STUDENT_KEY = 'studentRoster';
const LOCAL_STORAGE_TEACHER_KEY = 'teacherRoster';

const daysOfWeek: TimetableEntry['day'][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
];

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<TimetableEntry>>({});
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedTimetable = localStorage.getItem(LOCAL_STORAGE_TIMETABLE_KEY);
      setTimetable(savedTimetable ? JSON.parse(savedTimetable) : initialTimetable);

      const savedClasses = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
      setClasses(savedClasses ? JSON.parse(savedClasses) : initialClassRoster);

      const savedTeachers = localStorage.getItem(LOCAL_STORAGE_TEACHER_KEY);
      setTeachers(savedTeachers ? JSON.parse(savedTeachers) : initialTeacherRoster);
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setTimetable(initialTimetable);
      setClasses(initialClassRoster);
      setTeachers(initialTeacherRoster);
    }
  }, []);
  
  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_TIMETABLE_KEY, JSON.stringify(timetable));
    } catch (error) {
        console.error("Failed to save timetable to localStorage", error);
    }
  }, [timetable]);


  const handleAddEntry = () => {
    if (newEntry.day && newEntry.time && newEntry.classId && newEntry.teacherId && newEntry.subject) {
      const entry: TimetableEntry = {
        id: `tt${Date.now()}`,
        ...newEntry,
      } as TimetableEntry;
      
      setTimetable([...timetable, entry]);
      setIsDialogOpen(false);
      setNewEntry({});
      toast({
        title: "✅ Entry Added",
        description: "The new class has been added to the timetable.",
      });
    } else {
        toast({
            variant: "destructive",
            title: "⚠️ Missing Information",
            description: "Please fill out all fields to add a new entry.",
        });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setTimetable(timetable.filter(entry => entry.id !== id));
     toast({
        variant: "destructive",
        title: "🗑️ Entry Removed",
        description: "The class has been removed from the timetable.",
      });
  };

  const getEntryDetails = (day: string, time: string) => {
    const entry = timetable.find(e => e.day === day && e.time === time);
    if (!entry) return null;
    const teacher = teachers.find(t => t.id === entry.teacherId);
    const aClass = classes.find(c => c.id === entry.classId);
    return { ...entry, teacherName: teacher?.name, className: aClass?.name };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Timetable Management
            </CardTitle>
            <CardDescription>
              Manage the weekly schedule for all classes.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" /> Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Timetable Entry</DialogTitle>
                <DialogDescription>
                  Fill in the details to schedule a new class.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">Day</Label>
                  <Select onValueChange={(value) => setNewEntry({...newEntry, day: value as TimetableEntry['day']})}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select day" /></SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Time</Label>
                  <Select onValueChange={(value) => setNewEntry({...newEntry, time: value})}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select time slot" /></SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">Class</Label>
                  <Select onValueChange={(value) => setNewEntry({...newEntry, classId: value})}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right">Teacher</Label>
                   <Select onValueChange={(value) => setNewEntry({...newEntry, teacherId: value})}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select teacher" /></SelectTrigger>
                    <SelectContent>
                      {teachers.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">Subject</Label>
                  <Input id="subject" className="col-span-3" placeholder="e.g., Algebra II" onChange={(e) => setNewEntry({...newEntry, subject: e.target.value})} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddEntry}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-6">
            <div className="p-2 border-b border-r font-semibold text-center bg-muted">Time</div>
            {daysOfWeek.map(day => (
              <div key={day} className="p-2 border-b border-r font-semibold text-center bg-muted">{day}</div>
            ))}
          </div>
          {timeSlots.map(time => (
            <div key={time} className="grid grid-cols-6">
              <div className="p-2 border-r font-semibold text-center bg-muted/50">{time}</div>
              {daysOfWeek.map(day => {
                const entry = getEntryDetails(day, time);
                return (
                  <div key={`${day}-${time}`} className="p-2 border-r h-24 relative group">
                    {entry ? (
                      <div>
                        <p className="font-semibold text-sm">{entry.subject}</p>
                        <p className="text-xs text-muted-foreground">{entry.className}</p>
                        <p className="text-xs text-muted-foreground">{entry.teacherName}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                          onClick={() => handleDeleteEntry(entry.id)}
                        >
                            <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
