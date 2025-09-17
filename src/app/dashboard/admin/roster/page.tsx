
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { studentRoster as initialRoster, type Student, type ClassGroup, type StudentDocument } from "@/app/lib/student-roster";
import { UploadCloud, UserPlus, Users, Trash2, FolderPlus, FolderX, Mail, Phone, UserCircle, Edit, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const LOCAL_STORAGE_KEY = 'studentRoster';

export default function RosterPage() {
  const [roster, setRoster] = useState<ClassGroup[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentFile, setNewStudentFile] = useState<File | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [newClassName, setNewClassName] = useState("");
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<(Student & { classId: string }) | null>(null);
  const [updatedStudentName, setUpdatedStudentName] = useState("");
  const [updatedStudentFile, setUpdatedStudentFile] = useState<File | null>(null);
  const [updatedStudentClassId, setUpdatedStudentClassId] = useState("");

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [uploadingToStudent, setUploadingToStudent] = useState<Student | null>(null);
  
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
        console.error("Failed to load student data from localStorage", error);
        setRoster(initialRoster);
    }
  }, []);

  useEffect(() => {
    if (roster.length > 0) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roster));
            // Dispatch event to notify other components of the update
            window.dispatchEvent(new CustomEvent('rosterUpdated'));
        } catch (error) {
            console.error("Failed to save student data to localStorage", error);
        }
    }
  }, [roster]);
  
  const handleAddNewClass = () => {
    if (newClassName.trim()) {
      const newClass: ClassGroup = {
        id: `c${Date.now()}`,
        name: newClassName.trim(),
        students: [],
      };
      const updatedRoster = [...roster, newClass];
      setRoster(updatedRoster);
      setSelectedClassId(newClass.id); // Auto-select the new class
      setNewClassName(""); // Clear the input
       toast({
        title: "✅ Class Created",
        description: `Class "${newClass.name}" has been added.`,
      });
    }
  };


  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim() && newStudentFile && selectedClassId) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newStudent: Student = {
                id: `s${Date.now()}`,
                name: newStudentName.trim(),
                imageUrl: reader.result as string,
                grade: parseInt(roster.find(c => c.id === selectedClassId)?.name.match(/\d+/)?.[0] || '0'),
                email: `${newStudentName.trim().toLowerCase().replace(' ', '.')}@example.com`,
                emergencyContact: {
                  name: `Guardian of ${newStudentName.trim()}`,
                  phone: '000-000-0000',
                },
                documents: [],
            };

            const updatedRoster = roster.map(classGroup => {
                if (classGroup.id === selectedClassId) {
                    return {
                        ...classGroup,
                        students: [...(classGroup.students || []), newStudent],
                    };
                }
                return classGroup;
            });

            setRoster(updatedRoster);
            setNewStudentName("");
            setNewStudentFile(null);
            (document.getElementById('student-photo') as HTMLInputElement).value = '';

            toast({
                title: "✅ Student Added",
                description: `${newStudent.name} has been added to the selected class.`,
            });
        };
        reader.readAsDataURL(newStudentFile);
    } else {
        toast({
            variant: "destructive",
            title: "⚠️ Missing Information",
            description: "Please select a class, provide a name, and choose a photo.",
        });
    }
  };

  const handleOpenEditDialog = (student: Student, classId: string) => {
    setEditingStudent({ ...student, classId });
    setUpdatedStudentName(student.name);
    setUpdatedStudentClassId(classId);
    setUpdatedStudentFile(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const processUpdate = (imageUrl: string) => {
      const updatedStudentData = {
        ...editingStudent,
        name: updatedStudentName,
        imageUrl,
      };

      let newRoster = [...roster];

      // If class has changed, move the student
      if (editingStudent.classId !== updatedStudentClassId) {
        // Remove from old class
        newRoster = newRoster.map(cg => {
          if (cg.id === editingStudent.classId) {
            return { ...cg, students: cg.students.filter(s => s.id !== editingStudent.id) };
          }
          return cg;
        });
        // Add to new class
        newRoster = newRoster.map(cg => {
          if (cg.id === updatedStudentClassId) {
            return { ...cg, students: [...cg.students, updatedStudentData] };
          }
          return cg;
        });
      } else {
        // Just update in the same class
        newRoster = newRoster.map(cg => {
          if (cg.id === editingStudent.classId) {
            return {
              ...cg,
              students: cg.students.map(s => s.id === editingStudent.id ? updatedStudentData : s)
            };
          }
          return cg;
        });
      }

      setRoster(newRoster);
      toast({
        title: "✅ Student Updated",
        description: `${updatedStudentData.name}'s details have been updated.`,
      });
      setIsEditDialogOpen(false);
      setEditingStudent(null);
    };

    if (updatedStudentFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        processUpdate(reader.result as string);
      };
      reader.readAsDataURL(updatedStudentFile);
    } else {
      processUpdate(editingStudent.imageUrl);
    }
  };


  const handleDeleteStudent = (classId: string, studentId: string) => {
    let studentName = "";
    const updatedRoster = roster.map(classGroup => {
        if (classGroup.id === classId) {
            const studentToDelete = (classGroup.students || []).find(s => s.id === studentId);
            if (studentToDelete) {
                studentName = studentToDelete.name;
            }
            return {
                ...classGroup,
                students: (classGroup.students || []).filter(s => s.id !== studentId),
            };
        }
        return classGroup;
    });

    setRoster(updatedRoster);
    
    if (studentName) {
        toast({
            variant: "destructive",
            title: "🗑️ Student Removed",
            description: `${studentName} has been removed from the student records.`,
        });
    }
  };

  const handleDeleteClass = (classId: string) => {
    const classToDelete = roster.find(c => c.id === classId);
    if (classToDelete) {
      const updatedRoster = roster.filter(c => c.id !== classId);
      setRoster(updatedRoster);
      toast({
        variant: "destructive",
        title: "🗑️ Class Removed",
        description: `Class "${classToDelete.name}" has been removed.`,
      });
    }
  };

  const handleDocumentUpload = (studentId: string) => {
    if (!documentFile) {
        toast({ variant: "destructive", title: "No file selected" });
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        const newDocument: StudentDocument = {
            id: `doc${Date.now()}`,
            name: documentFile.name,
            url: reader.result as string,
            type: documentFile.type,
        };

        const updatedRoster = roster.map(cg => ({
            ...cg,
            students: cg.students.map(s => {
                if (s.id === studentId) {
                    return { ...s, documents: [...(s.documents || []), newDocument] };
                }
                return s;
            }),
        }));
        setRoster(updatedRoster);
        toast({ title: "✅ Document Uploaded", description: `${newDocument.name} added to student profile.` });
        setDocumentFile(null);
        if (uploadingToStudent) {
            const updatedStudent = updatedRoster.flatMap(cg => cg.students).find(s => s.id === studentId);
            if (updatedStudent) {
                setUploadingToStudent(updatedStudent);
            }
        }
    };
    reader.readAsDataURL(documentFile);
  };

  const openStudentDialog = (student: Student) => {
    setUploadingToStudent(student);
  };


  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Main Content: Roster Display */}
        <Card className="lg:col-span-2 h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Student Records
                </CardTitle>
                <CardDescription>Manage classes and student profiles for AI attendance.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] -mr-4 pr-4">
                    <Accordion type="multiple" className="w-full" defaultValue={roster.map(c => c.id)}>
                    {roster.map((classGroup) => (
                        <AccordionItem key={classGroup.id} value={classGroup.id}>
                            <div className="flex items-center w-full">
                                <AccordionTrigger className="flex-1 text-left">
                                    {classGroup.name} 
                                    <span className="text-muted-foreground font-normal ml-2">({(classGroup.students || []).length} students)</span>
                                </AccordionTrigger>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 ml-2"
                                            aria-label={`Delete class ${classGroup.name}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FolderX className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Class: {classGroup.name}?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                        This action cannot be undone. This will permanently remove the class and all students within it.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteClass(classGroup.id)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            <AccordionContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                                {(classGroup.students || []).map((student) => (
                                <Dialog key={student.id} onOpenChange={(open) => open && openStudentDialog(student)}>
                                    <div className="text-center relative pt-2 group">
                                         <DialogTrigger asChild>
                                            <div className="cursor-pointer">
                                                <div className="aspect-square rounded-full overflow-hidden relative border-2 border-primary/20 group-hover:border-primary transition-colors">
                                                    <Image src={student.imageUrl} alt={student.name} fill objectFit="cover" />
                                                </div>
                                                <p className="text-sm font-medium mt-2 truncate">{student.name}</p>
                                            </div>
                                        </DialogTrigger>
                                        <div className="absolute top-0 right-0 flex gap-1">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6"
                                                aria-label={`Edit ${student.name}`}
                                                onClick={() => handleOpenEditDialog(student, classGroup.id)}
                                            >
                                                <Edit className="w-3 h-3" />
                                            </Button>
                                            <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    aria-label={`Delete ${student.name}`}
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently remove {student.name} from the student records.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDeleteStudent(classGroup.id, student.id)}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                    <DialogContent>
                                        <DialogHeader>
                                            <div className="flex items-center gap-4">
                                                <div className="w-24 h-24 rounded-full overflow-hidden relative border-4 border-primary/20">
                                                     <Image src={student.imageUrl} alt={student.name} fill objectFit="cover" />
                                                </div>
                                                <div>
                                                    <DialogTitle className="text-2xl">{student.name}</DialogTitle>
                                                    <DialogDescription>Grade {student.grade} &bull; {classGroup.name}</DialogDescription>
                                                </div>
                                            </div>
                                        </DialogHeader>
                                        <div className="py-4 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-muted-foreground" />
                                                <a href={`mailto:${student.email}`} className="text-sm hover:underline">{student.email}</a>
                                            </div>
                                            <h4 className="font-semibold mt-4 border-b pb-1">Emergency Contact</h4>
                                            {student.emergencyContact && (
                                                <>
                                                    <div className="flex items-center gap-3">
                                                        <UserCircle className="w-5 h-5 text-muted-foreground" />
                                                        <span className="text-sm">{student.emergencyContact.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                                        <a href={`tel:${student.emergencyContact.phone}`} className="text-sm hover:underline">{student.emergencyContact.phone}</a>
                                                    </div>
                                                </>
                                            )}
                                            <div className="space-y-2 pt-2">
                                                <h4 className="font-semibold border-b pb-1">Documents</h4>
                                                <div className="space-y-2">
                                                    {(uploadingToStudent?.documents || []).length > 0 ? (
                                                        (uploadingToStudent?.documents || []).map(doc => (
                                                            <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                                                <div className="flex items-center gap-2">
                                                                    <FileText className="w-4 h-4" />
                                                                    <span className="text-sm font-medium truncate">{doc.name}</span>
                                                                </div>
                                                                <a href={doc.url} download={doc.name}>
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                                                        <Download className="w-4 h-4" />
                                                                    </Button>
                                                                </a>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground text-center py-2">No documents uploaded.</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <Input type="file" onChange={(e) => setDocumentFile(e.target.files?.[0] || null)} className="flex-1" />
                                                    <Button onClick={() => handleDocumentUpload(student.id)} disabled={!documentFile}>
                                                        <UploadCloud className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                ))}
                                {(classGroup.students || []).length === 0 && (
                                    <p className="col-span-full text-center text-sm text-muted-foreground py-4">No students in this class yet.</p>
                                )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                     {roster.length === 0 && (
                        <p className="col-span-full text-center text-sm text-muted-foreground py-10">No classes have been created yet.</p>
                    )}
                    </Accordion>
                </ScrollArea>
            </CardContent>
        </Card>
        
        {/* Sidebar: Action Forms */}
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FolderPlus className="w-5 h-5" /> Add New Class</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="new-class-name">New Class Name</Label>
                        <div className="flex gap-2">
                        <Input
                            id="new-class-name"
                            value={newClassName}
                            onChange={(e) => setNewClassName(e.target.value)}
                            placeholder="e.g., Grade 9 History"
                        />
                        <Button onClick={handleAddNewClass} size="icon" aria-label="Add new class">
                            <FolderPlus className="w-4 h-4" />
                        </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserPlus className="w-5 h-5" /> Add New Student</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="class-select">Select Class</Label>
                            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                                <SelectTrigger id="class-select">
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
                            Add Student
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>

        {/* Edit Student Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Student Details</DialogTitle>
                    <DialogDescription>
                        Update the information for {editingStudent?.name}.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdateStudent} className="space-y-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-student-name">Student Name</Label>
                        <Input
                            id="edit-student-name"
                            value={updatedStudentName}
                            onChange={(e) => setUpdatedStudentName(e.target.value)}
                            required
                        />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="edit-class-select">Class</Label>
                        <Select value={updatedStudentClassId} onValueChange={setUpdatedStudentClassId}>
                            <SelectTrigger id="edit-class-select">
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
                    <div className="grid gap-2">
                        <Label htmlFor="edit-student-photo">New Student Photo (Optional)</Label>
                        <Input
                            id="edit-student-photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setUpdatedStudentFile(e.target.files?.[0] || null)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
}

    
