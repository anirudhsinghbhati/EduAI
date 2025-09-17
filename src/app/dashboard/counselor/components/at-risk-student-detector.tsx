"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { studentRoster as initialRoster, type ClassGroup, type Student } from "@/app/lib/student-roster";
import { initialPerformanceData, type PerformanceRecord } from "@/app/lib/performance";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, AlertTriangle, ShieldCheck, HeartPulse } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { getStudentPerformancePrediction } from "@/app/actions";
import type { PredictStudentPerformanceOutput } from "@/ai/flows/predict-student-performance";
import { Badge } from "@/components/ui/badge";

const LOCAL_STORAGE_STUDENT_KEY = 'studentRoster';
const LOCAL_STORAGE_PERFORMANCE_KEY = 'performanceRecords';

const riskLevelConfig: Record<PredictStudentPerformanceOutput['riskLevel'], { icon: React.ElementType, color: string, variant: "default" | "secondary" | "destructive" | "outline" }> = {
  Low: { icon: ShieldCheck, color: "text-green-600", variant: "default" },
  Medium: { icon: AlertTriangle, color: "text-amber-600", variant: "outline" },
  High: { icon: HeartPulse, color: "text-red-600", variant: "destructive" },
};

export function AtRiskStudentDetector() {
  const [students, setStudents] = useState<Student[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceRecord[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [prediction, setPrediction] = useState<PredictStudentPerformanceOutput | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedRoster = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
      const roster: ClassGroup[] = savedRoster ? JSON.parse(savedRoster) : initialRoster;
      const allStudents = roster.flatMap(cg => cg.students);
      setStudents(allStudents);

      const savedPerformances = localStorage.getItem(LOCAL_STORAGE_PERFORMANCE_KEY);
      setPerformanceData(savedPerformances ? JSON.parse(savedPerformances) : initialPerformanceData);
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const studentPerformance = performanceData.filter(p => p.studentId === selectedStudentId);

  const handleGeneratePrediction = () => {
    if (!selectedStudent) return;

    // Mock data for the flow
    const recentGrades = studentPerformance.map(p => `${p.subject}: ${p.grade}%`).join(', ') || 'No grades available';
    const attendancePercentage = 92; // Mock data
    const behavioralNotes = 'Shows potential but is sometimes disengaged in class.'; // Mock data

    startTransition(async () => {
      setPrediction(null);
      const result = await getStudentPerformancePrediction({
        studentName: selectedStudent.name,
        recentGrades,
        attendancePercentage,
        behavioralNotes,
      });
      if ('error' in result) {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: result.error,
        });
      } else {
        setPrediction(result);
      }
    });
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Powered Student Insight
        </CardTitle>
        <CardDescription>
          Predict student performance and identify at-risk students for early intervention.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="grid gap-2 w-full sm:flex-1">
            <label htmlFor="student-select" className="text-sm font-medium">Select a Student</label>
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger id="student-select">
                <SelectValue placeholder="Choose a student to analyze..." />
              </SelectTrigger>
              <SelectContent>
                {students.map(student => (
                  <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGeneratePrediction} disabled={!selectedStudentId || isPending} className="w-full sm:w-auto">
            {isPending ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
            Generate Analysis
          </Button>
        </div>

        {selectedStudent && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">{selectedStudent.name}</CardTitle>
              <CardDescription>Current Academic Snapshot</CardDescription>
            </CardHeader>
            <CardContent>
              {studentPerformance.length > 0 ? (
                <ul className="space-y-1 text-sm">
                  {studentPerformance.map(p => (
                    <li key={p.id} className="flex justify-between">
                      <span>{p.subject} ({p.term})</span>
                      <span className="font-medium">{p.grade}%</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-center text-muted-foreground">No performance data available for this student.</p>
              )}
            </CardContent>
          </Card>
        )}

        {isPending && !prediction && (
          <div className="flex flex-col items-center justify-center h-40 text-sm text-muted-foreground space-y-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p>AI is analyzing student data...</p>
              <p className="text-xs">This may take a moment.</p>
          </div>
        )}
        
        {prediction && (
          <Alert>
            <prediction.icon className={`h-5 w-5 ${riskLevelConfig[prediction.riskLevel].color}`} />
            <AlertTitle className="flex items-center gap-2">
              Prediction Analysis
              <Badge variant={riskLevelConfig[prediction.riskLevel].variant}>{prediction.riskLevel} Risk</Badge>
            </AlertTitle>
            <AlertDescription className="space-y-4 mt-2">
              <div>
                <h4 className="font-semibold">Summary</h4>
                <p className="text-sm">{prediction.predictionSummary}</p>
              </div>
              <div>
                <h4 className="font-semibold">Recommended Interventions</h4>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  {prediction.recommendedInterventions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
