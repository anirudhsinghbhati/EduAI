"use client";

import { useState } from "react";
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
import { Camera, Check, Loader2, Upload } from "lucide-react";

export function AttendanceCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleConfirm = () => {
    if (!fileName) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000); // Simulate processing time
  };
  
  const resetState = () => {
    setIsOpen(false);
    setIsLoading(false);
    setIsSuccess(false);
    setFileName("");
  };

  return (
    <Card className="lg:col-span-1 flex flex-col justify-center items-center p-6 bg-primary/10 border-dashed border-primary/50">
      <div className="text-center">
        <Camera className="mx-auto h-12 w-12 text-primary mb-4" />
        <CardTitle>Attendance Capture</CardTitle>
        <CardDescription className="mt-2">Take or upload a group photo to mark attendance.</CardDescription>
        <Dialog open={isOpen} onOpenChange={(open) => !open && resetState()}>
          <DialogTrigger asChild>
            <Button className="mt-4" onClick={() => setIsOpen(true)}>Take Attendance</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Mark Class Attendance</DialogTitle>
              <DialogDescription>
                Upload a group photo of the class. Our AI will automatically detect and mark present students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-40">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Analyzing photo...</p>
                </div>
              ) : isSuccess ? (
                <div className="flex flex-col items-center justify-center h-40">
                  <Check className="h-16 w-16 text-green-500" />
                  <p className="mt-4 font-medium">Attendance Marked Successfully!</p>
                  <p className="text-sm text-muted-foreground">28 students marked present.</p>
                </div>
              ) : (
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="picture">Class Photo</Label>
                  <div className="flex w-full justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <Label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                          <span>Upload a file</span>
                          <Input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                        </Label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {fileName && <p className="text-sm text-muted-foreground mt-2">File: {fileName}</p>}
                </div>
              )}
            </div>
            <DialogFooter>
              {isSuccess ? (
                 <Button onClick={resetState}>Close</Button>
              ) : (
                <>
                  <Button variant="outline" onClick={resetState}>Cancel</Button>
                  <Button onClick={handleConfirm} disabled={!fileName || isLoading}>
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
