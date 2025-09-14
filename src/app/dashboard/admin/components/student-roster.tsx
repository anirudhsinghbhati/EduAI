
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { studentRoster as initialRoster, type Student } from "@/app/lib/student-roster";
import { UploadCloud, UserPlus, Users, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LOCAL_STORAGE_KEY = 'studentRoster';

export function StudentRoster() {
  const [roster, setRoster] = useState<Student[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentFile, setNewStudentFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedRoster) {
        setRoster(JSON.parse(savedRoster));
      } else {
        setRoster(initialRoster);
      }
    } catch (error) {
        console.error("Failed to load roster from localStorage", error);
        setRoster(initialRoster);
    }
  }, []);

  useEffect(() => {
    if (roster.length > 0) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roster));
        } catch (error) {
            console.error("Failed to save roster to localStorage", error);
        }
    }
  }, [roster]);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim() && newStudentFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newStudent: Student = {
                id: `s${Date.now()}`, // Use timestamp for more unique ID
                name: newStudentName.trim(),
                imageUrl: reader.result as string, // Store as data URI
            };
            setRoster([...roster, newStudent]);
            setNewStudentName("");
            setNewStudentFile(null);
            (document.getElementById('student-photo') as HTMLInputElement).value = '';

            toast({
                title: "✅ Student Added",
                description: `${newStudent.name} has been added to the roster.`,
            });
        };
        reader.readAsDataURL(newStudentFile);
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    const studentToDelete = roster.find(s => s.id === studentId);
    if (studentToDelete) {
        setRoster(roster.filter((student) => student.id !== studentId));
        toast({
            variant: "destructive",
            title: "🗑️ Student Removed",
            description: `${studentToDelete.name} has been removed from the roster.`,
        });
    }
  };


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Student Roster
        </CardTitle>
        <CardDescription>Manage student profiles and photos for AI attendance.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {roster.map((student) => (
              <div key={student.id} className="text-center group relative">
                <div className="aspect-square rounded-full overflow-hidden relative border-2 border-primary/20">
                    <Image src={student.imageUrl} alt={student.name} layout="fill" objectFit="cover" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteStudent(student.id)}
                            aria-label={`Delete ${student.name}`}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <p className="text-sm font-medium mt-2 truncate">{student.name}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleAddStudent} className="space-y-4 pt-4 border-t">
            <h4 className="font-medium flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add New Student</h4>
            <div className="grid gap-2">
                <Label htmlFor="student-name">Student Name</Label>
                <Input
                id="student-name"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="e.g., Jane Doe"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="student-photo">Student Photo</Label>
                <Input
                id="student-photo"
                type="file"
                accept="image/*"
                onChange={(e) => setNewStudentFile(e.target.files?.[0] || null)}
                required
                />
            </div>
            <Button type="submit" className="w-full">
                <UploadCloud className="mr-2" />
                Add to Roster
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
