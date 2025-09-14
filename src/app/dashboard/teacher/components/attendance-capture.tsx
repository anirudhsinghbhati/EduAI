
"use client";

import { useState, useEffect, useRef } from "react";
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
import { Camera, Check, Loader2, Upload, Users, Video, Image as ImageIcon } from "lucide-react";
import { identifyPresentStudents } from "@/app/actions";
import { studentRoster as initialRoster, type Student, type ClassGroup } from "@/app/lib/student-roster";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AttendanceResult = {
  present: Student[];
  absent: Student[];
};

const LOCAL_STORAGE_KEY = 'studentRoster';

export function AttendanceCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classPhotoDataUri, setClassPhotoDataUri] = useState<string | null>(
    null
  );
  const [currentRoster, setCurrentRoster] = useState<Student[]>([]);
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
        const savedRoster = localStorage.getItem(LOCAL_STORAGE_KEY);
        const rosterData: ClassGroup[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
        const allStudents = rosterData.flatMap(classGroup => classGroup.students || []);
        setCurrentRoster(allStudents);
    } catch (error) {
        console.error("Could not load roster for attendance", error);
        const allStudents = initialRoster.flatMap(classGroup => classGroup.students || []);
        setCurrentRoster(allStudents);
    }
  }, [isOpen]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const getCameraPermission = async () => {
      if (!isOpen || hasCameraPermission) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };
    getCameraPermission();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [isOpen, hasCameraPermission]);

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

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUri);
        setClassPhotoDataUri(dataUri);
      }
    }
  };

  const toDataUri = async (url: string): Promise<string> => {
    if (url.startsWith('data:')) {
        return url;
    }
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
    if (!classPhotoDataUri || currentRoster.length === 0) return;

    setIsLoading(true);
    setResult(null);

    try {
      const rosterWithDataUris = await Promise.all(
        currentRoster.map(async (student) => ({
          id: student.id,
          name: student.name,
          photoDataUri: await toDataUri(student.imageUrl),
        }))
      );

      const presentStudentIds = await identifyPresentStudents({
        classPhotoDataUri,
        studentRoster: rosterWithDataUris,
      });

      const present = currentRoster.filter((s) => presentStudentIds.includes(s.id));
      const absent = currentRoster.filter((s) => !presentStudentIds.includes(s.id));
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
    setHasCameraPermission(null);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <Card className="lg:col-span-1 flex flex-col justify-center items-center p-6 bg-primary/10 border-dashed border-primary/50">
      <div className="text-center">
        <Camera className="mx-auto h-12 w-12 text-primary mb-4" />
        <CardTitle>Attendance Capture</CardTitle>
        <CardDescription className="mt-2">Use AI to mark attendance from a group photo.</CardDescription>
        <Dialog open={isOpen} onOpenChange={(open) => !open && resetState()}>
          <DialogTrigger asChild>
            <Button className="mt-4" onClick={() => setIsOpen(true)}>Take Attendance</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Mark Class Attendance</DialogTitle>
              <DialogDescription>
                {result ? "Attendance results are in." : "Upload or capture a class photo for AI analysis."}
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
                        <p className="text-sm text-muted-foreground">{result.present.length} of {currentRoster.length} students marked present.</p>
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
                <Tabs defaultValue="upload">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload"><Upload className="mr-2" /> Upload</TabsTrigger>
                    <TabsTrigger value="camera"><Video className="mr-2" /> Use Camera</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="pt-4">
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="picture">Class Photo</Label>
                      {imagePreview ? (
                        <div className="relative aspect-video w-full rounded-md overflow-hidden">
                          <Image src={imagePreview} alt="Class photo preview" fill objectFit="cover" />
                        </div>
                      ) : (
                        <div className="flex w-full justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <Label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                              <span>Upload a file</span>
                              <Input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                            </Label>
                            <p className="pl-1 text-xs text-muted-foreground">or drag and drop</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="camera" className="pt-4">
                     <div className="space-y-2">
                      {imagePreview ? (
                         <div className="relative aspect-video w-full rounded-md overflow-hidden">
                            <Image src={imagePreview} alt="Camera capture preview" fill objectFit="cover" />
                        </div>
                      ) : (
                        <>
                           <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                           <canvas ref={canvasRef} className="hidden" />
                        </>
                      )}

                      {hasCameraPermission === false && (
                         <Alert variant="destructive">
                           <AlertTitle>Camera Access Denied</AlertTitle>
                           <AlertDescription>
                             Please enable camera permissions in your browser settings to use this feature.
                           </AlertDescription>
                         </Alert>
                       )}

                       <div className="flex gap-2">
                          <Button onClick={handleCapture} disabled={!hasCameraPermission} className="w-full">
                            <Camera className="mr-2"/>
                            Take Photo
                          </Button>
                          {imagePreview && (
                            <Button variant="outline" onClick={() => { setImagePreview(null); setClassPhotoDataUri(null); }}>
                                Retake
                            </Button>
                          )}
                       </div>
                    </div>
                  </TabsContent>
                </Tabs>
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

