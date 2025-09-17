
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { teacherRoster as initialRoster, type Teacher } from "@/app/lib/teacher-roster";
import { UploadCloud, UserPlus, Trash2, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const LOCAL_STORAGE_KEY = 'teacherRoster';

export default function TeacherRosterPage() {
  const [roster, setRoster] = useState<Teacher[]>([]);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherSubject, setNewTeacherSubject] = useState("");
  const [newTeacherFile, setNewTeacherFile] = useState<File | null>(null);
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
        console.error("Failed to load teacher roster from localStorage", error);
        setRoster(initialRoster);
    }
  }, []);

  useEffect(() => {
    if (roster.length > 0 || localStorage.getItem(LOCAL_STORAGE_KEY)) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roster));
            // Dispatch event to notify other components of the update
            window.dispatchEvent(new CustomEvent('teacherRosterUpdated'));
        } catch (error) {
            console.error("Failed to save teacher roster to localStorage", error);
        }
    }
  }, [roster]);
  
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeacherName.trim() && newTeacherSubject.trim() && newTeacherFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newTeacher: Teacher = {
                id: `t${Date.now()}`,
                name: newTeacherName.trim(),
                subject: newTeacherSubject.trim(),
                imageUrl: reader.result as string,
            };

            setRoster(prevRoster => [...prevRoster, newTeacher]);
            setNewTeacherName("");
            setNewTeacherSubject("");
            setNewTeacherFile(null);
            (document.getElementById('teacher-photo') as HTMLInputElement).value = '';

            toast({
                title: "✅ Teacher Added",
                description: `${newTeacher.name} has been added to the roster.`,
            });
        };
        reader.readAsDataURL(newTeacherFile);
    } else {
        toast({
            variant: "destructive",
            title: "⚠️ Missing Information",
            description: "Please provide a name, subject, and photo.",
        });
    }
  };

  const handleDeleteTeacher = (teacherId: string) => {
    let teacherName = "";
    const teacherToDelete = roster.find(t => t.id === teacherId);
    if(teacherToDelete) {
        teacherName = teacherToDelete.name;
    }

    setRoster(roster.filter(teacher => teacher.id !== teacherId));
    
    if (teacherName) {
        toast({
            variant: "destructive",
            title: "🗑️ Teacher Removed",
            description: `${teacherName} has been removed from the roster.`,
        });
    }
  };


  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-primary" />
          Teacher Roster Management
        </CardTitle>
        <CardDescription>Manage teacher profiles and contact information.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 -mr-4 pr-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
            {roster.map((teacher) => (
                <div key={teacher.id} className="text-center group relative">
                    <div className="aspect-square rounded-full overflow-hidden relative border-2 border-primary/20">
                        <Image src={teacher.imageUrl} alt={teacher.name} fill objectFit="cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    aria-label={`Delete ${teacher.name}`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently remove {teacher.name} from the roster.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteTeacher(teacher.id)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    <p className="text-sm font-medium mt-2 truncate">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                </div>
            ))}
            {roster.length === 0 && (
                <p className="col-span-full text-center text-sm text-muted-foreground py-4">No teachers on the roster yet.</p>
            )}
            </div>
        </ScrollArea>
        <div className="pt-4 border-t">
            <h4 className="font-medium flex items-center gap-2 mb-4"><UserPlus className="w-4 h-4" /> Add New Teacher</h4>
            <form onSubmit={handleAddTeacher} className="space-y-4">
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="teacher-name">Teacher Name</Label>
                        <Input
                        id="teacher-name"
                        value={newTeacherName}
                        onChange={(e) => setNewTeacherName(e.target.value)}
                        placeholder="e.g., John Smith"
                        required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="teacher-subject">Subject</Label>
                        <Input
                        id="teacher-subject"
                        value={newTeacherSubject}
                        onChange={(e) => setNewTeacherSubject(e.target.value)}
                        placeholder="e.g., Mathematics"
                        required
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="teacher-photo">Teacher Photo</Label>
                    <Input
                    id="teacher-photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewTeacherFile(e.target.files?.[0] || null)}
                    required
                    />
                </div>
                <Button type="submit" className="w-full">
                    <UploadCloud className="mr-2" />
                    Add Teacher to Roster
                </Button>
            </form>
        </div>
      </CardContent>
    </Card>
  );
}
