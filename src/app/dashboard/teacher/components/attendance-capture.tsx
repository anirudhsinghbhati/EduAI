"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Check, Loader2, Upload, Users } from "lucide-react";
import { identifyPresentStudents } from "@/app/actions";
import { studentRoster, type Student } from "@/app/lib/student-roster";
import { useToast } from "@/hooks/use-toast";

type AttendanceResult = {
  present: Student[];
  absent: Student[];
};

export function AttendanceCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classPhotoDataUri, setClassPhotoDataUri] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(URL.createObjectURL(file));
        setClassPhotoDataUri(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const toDataUri = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleConfirm = async () => {
    if (!classPhotoDataUri) return;

    setIsLoading(true);
    setResult(null);

    try {
      // Prepare roster data by converting image URLs to data URIs
      const rosterWithDataUris = await Promise.all(
        studentRoster.map(async (student) => ({
          ...student,
          photoDataUri: await toDataUri(student.imageUrl),
        }))
      );

      const presentStudentIds = await identifyPresentStudents({
        classPhotoDataUri,
        studentRoster: rosterWithDataUris,
      });

      const present = studentRoster.filter((s) => presentStudentIds.includes(s.id));
      const absent = studentRoster.filter((s) => !presentStudentIds.includes(s.id));
      setResult({ present, absent });

    } catch (error) {
      console.error("Error during attendance confirmation:", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not process the image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsOpen(false);
    setIsLoading(false);
    setResult(null);
    setImagePreview(null);
    setClassPhotoDataUri(null);
  };

  return (
    <Card className="lg:col-span-1 flex flex-col justify-center items-center p-6 bg-primary/10 border-dashed border-primary/50">
      <div className="text-center">
        <Camera className="mx-auto h-12 w-12 text-primary mb-4" />
        <CardTitle>Attendance Capture</CardTitle>
        <CardDescription className="mt-2">Upload a group photo to mark attendance automatically.</CardDescription>
        <Dialog open={isOpen} onOpenChange={(open) => !open && resetState()}>
          <DialogTrigger asChild>
            <Button className="mt-4" onClick={() => setIsOpen(true)}>Take Attendance</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Mark Class Attendance</DialogTitle>
              <DialogDescription>
                {result ? "Attendance results are in." : "Upload a class photo for AI analysis."}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-40">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Analyzing photo, this may take a moment...</p>
                </div>
              )}

              {!isLoading && result && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                     <Check className="h-8 w-8 text-green-500 mr-3" />
                     <div>
                        <p className="font-medium text-lg text-green-700 dark:text-green-300">Analysis Complete!</p>
                        <p className="text-sm text-muted-foreground">{result.present.length} of {studentRoster.length} students marked present.</p>
                     </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Present ({result.present.length})</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.present.map(s => <span key={s.id} className="text-xs bg-secondary px-2 py-1 rounded-full">{s.name}</span>)}
                    </div>
                  </div>
                   <div>
                    <h4 className="font-semibold mb-2">Absent ({result.absent.length})</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.absent.map(s => <span key={s.id} className="text-xs bg-destructive/10 text-destructive-foreground px-2 py-1 rounded-full">{s.name}</span>)}
                    </div>
                  </div>
                </div>
              )}

              {!isLoading && !result && (
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="picture">Class Photo</Label>
                  {imagePreview ? (
                    <div className="relative aspect-video w-full rounded-md overflow-hidden">
                      <Image src={imagePreview} alt="Class photo preview" layout="fill" objectFit="cover" />
                    </div>
                  ) : (
                    <div className="flex w-full justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <Label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                          <span>Upload a file</span>
                          <Input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                        </Label>
                        <p className="pl-1 text-xs text-muted-foreground">or drag and drop</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              {result ? (
                 <Button onClick={resetState}>Close</Button>
              ) : (
                <>
                  <Button variant="outline" onClick={resetState} disabled={isLoading}>Cancel</Button>
                  <Button onClick={handleConfirm} disabled={!classPhotoDataUri || isLoading}>
                    <Users className="mr-2 h-4 w-4" />
                    Confirm Attendance
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
