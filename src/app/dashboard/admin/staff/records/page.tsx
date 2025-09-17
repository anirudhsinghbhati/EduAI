
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { teacherRoster as initialRoster, type Teacher } from "@/app/lib/teacher-roster";
import { UploadCloud, UserPlus, Trash2, UserCheck, Mail, Phone, Edit, Award } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LOCAL_STORAGE_KEY = 'teacherRoster';

export default function StaffRosterPage() {
  const [roster, setRoster] = useState<Teacher[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form state for adding/editing
  const [teacherName, setTeacherName] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");
  const [teacherQualifications, setTeacherQualifications] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherFile, setTeacherFile] = useState<File | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
      setRoster(savedRoster ? JSON.parse(savedRoster) : initialRoster);
    } catch (error) {
        console.error("Failed to load teacher data from localStorage", error);
        setRoster(initialRoster);
    }
  }, []);

  useEffect(() => {
    if (roster.length > 0 || localStorage.getItem(LOCAL_STORAGE_KEY)) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roster));
            window.dispatchEvent(new CustomEvent('teacherRosterUpdated'));
        } catch (error) {
            console.error("Failed to save teacher data to localStorage", error);
        }
    }
  }, [roster]);

  const resetForm = () => {
    setTeacherName("");
    setTeacherSubject("");
    setTeacherQualifications("");
    setTeacherEmail("");
    setTeacherPhone("");
    setTeacherFile(null);
    setEditingTeacher(null);
  };
  
  const handleOpenAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherName(teacher.name);
    setTeacherSubject(teacher.subject);
    setTeacherQualifications(teacher.qualifications);
    setTeacherEmail(teacher.email);
    setTeacherPhone(teacher.phone);
    setTeacherFile(null);
    setIsEditDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim() || !teacherSubject.trim() || !teacherEmail.trim()) {
      toast({ variant: "destructive", title: "Missing required fields" });
      return;
    }

    const processSubmit = (imageUrl: string) => {
      if (editingTeacher) {
        // Update existing teacher
        const updatedTeacher = { 
          ...editingTeacher, 
          name: teacherName.trim(),
          subject: teacherSubject.trim(),
          qualifications: teacherQualifications.trim(),
          email: teacherEmail.trim(),
          phone: teacherPhone.trim(),
          imageUrl
        };
        setRoster(roster.map(t => t.id === editingTeacher.id ? updatedTeacher : t));
        toast({ title: "✅ Staff Updated", description: `${updatedTeacher.name}'s details have been updated.` });
      } else {
        // Add new teacher
        const newTeacher: Teacher = {
          id: `t${Date.now()}`,
          name: teacherName.trim(),
          subject: teacherSubject.trim(),
          qualifications: teacherQualifications.trim(),
          email: teacherEmail.trim(),
          phone: teacherPhone.trim(),
          imageUrl
        };
        setRoster(prevRoster => [...prevRoster, newTeacher]);
        toast({ title: "✅ Staff Added", description: `${newTeacher.name} has been added to the records.` });
      }
      
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      resetForm();
    };

    if (teacherFile) {
        const reader = new FileReader();
        reader.onloadend = () => processSubmit(reader.result as string);
        reader.readAsDataURL(teacherFile);
    } else if (editingTeacher) {
        processSubmit(editingTeacher.imageUrl);
    } else {
        toast({ variant: "destructive", title: "Photo is required for new staff." });
    }
  };

  const handleDeleteTeacher = (teacherId: string) => {
    const teacherName = roster.find(t => t.id === teacherId)?.name || "The staff member";
    setRoster(roster.filter(teacher => teacher.id !== teacherId));
    toast({
        variant: "destructive",
        title: "🗑️ Staff Removed",
        description: `${teacherName} has been removed from the records.`,
    });
  };

  const StaffForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-1.5">
            <Label htmlFor="teacher-name">Full Name</Label>
            <Input id="teacher-name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required />
        </div>
        <div className="grid gap-1.5">
            <Label htmlFor="teacher-subject">Primary Subject</Label>
            <Input id="teacher-subject" value={teacherSubject} onChange={(e) => setTeacherSubject(e.target.value)} required />
        </div>
      </div>
       <div className="grid gap-1.5">
            <Label htmlFor="teacher-qualifications">Qualifications</Label>
            <Input id="teacher-qualifications" value={teacherQualifications} onChange={(e) => setTeacherQualifications(e.target.value)} placeholder="e.g., M.Sc. Physics, B.Ed."/>
        </div>
       <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
                <Label htmlFor="teacher-email">Email</Label>
                <Input id="teacher-email" type="email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="teacher-phone">Phone</Label>
                <Input id="teacher-phone" type="tel" value={teacherPhone} onChange={(e) => setTeacherPhone(e.target.value)} />
            </div>
        </div>
        <div className="grid gap-1.5">
            <Label htmlFor="teacher-photo">Photo</Label>
            <Input id="teacher-photo" type="file" accept="image/*" onChange={(e) => setTeacherFile(e.target.files?.[0] || null)} required={!editingTeacher} />
            {editingTeacher && <p className="text-xs text-muted-foreground">Leave blank to keep the current photo.</p>}
        </div>
         <DialogFooter>
            <Button variant="outline" type="button" onClick={() => { setIsAddDialogOpen(false); setIsEditDialogOpen(false); }}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
        </DialogFooter>
    </form>
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" />
              Staff Records
            </CardTitle>
            <CardDescription>Manage faculty profiles and contact information.</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleOpenAddDialog}><UserPlus className="mr-2" /> Add Staff</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                </DialogHeader>
                <StaffForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 -mr-4 pr-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
            {roster.map((teacher) => (
              <Dialog key={teacher.id}>
                <div className="text-center relative pt-2 group">
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                        <div className="aspect-square rounded-full overflow-hidden relative border-2 border-primary/20 group-hover:border-primary transition-colors">
                            <Image src={teacher.imageUrl} alt={teacher.name} fill objectFit="cover" />
                        </div>
                        <p className="text-sm font-medium mt-2 truncate">{teacher.name}</p>
                        <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </DialogTrigger>
                  <div className="absolute top-0 right-0 flex gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleOpenEditDialog(teacher)}><Edit className="w-3 h-3" /></Button>
                      <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" className="h-6 w-6"><Trash2 className="w-3 h-3" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>This will permanently remove {teacher.name} from the records.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTeacher(teacher.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                  </div>
                </div>
                 <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden relative border-4 border-primary/20">
                                <Image src={teacher.imageUrl} alt={teacher.name} fill objectFit="cover" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">{teacher.name}</DialogTitle>
                                <DialogDescription>{teacher.subject}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-muted-foreground" /><a href={`mailto:${teacher.email}`} className="text-sm hover:underline">{teacher.email}</a></div>
                        <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-muted-foreground" /><a href={`tel:${teacher.phone}`} className="text-sm hover:underline">{teacher.phone}</a></div>
                        <div className="flex items-center gap-3"><Award className="w-5 h-5 text-muted-foreground" /><span className="text-sm">{teacher.qualifications || "Not specified"}</span></div>
                    </div>
                </DialogContent>
              </Dialog>
            ))}
            {roster.length === 0 && (
                <p className="col-span-full text-center text-sm text-muted-foreground py-4">No staff in the records yet.</p>
            )}
            </div>
        </ScrollArea>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Staff Member Details</DialogTitle>
                    <DialogDescription>Update the information for {editingTeacher?.name}.</DialogDescription>
                </DialogHeader>
                <StaffForm />
            </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
