"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getLearningRecommendations } from "@/app/actions";
import { Loader2, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LearningRecommendations() {
  const [studentProfile, setStudentProfile] = useState("Struggling with Algebra, excels in Geometry. Prefers visual learning aids and interactive examples. Goal is to improve overall Math grade to an A.");
  const [pastPerformance, setPastPerformance] = useState("Last test score in Algebra: 65%. Consistently scores above 90% in Geometry. Homework completion rate is 80%.");
  const [recommendations, setRecommendations] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await getLearningRecommendations({
        studentProfile,
        pastPerformance,
      });
      setRecommendations(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Learning Recommendations
        </CardTitle>
        <CardDescription>
          Get personalized study tips and content based on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="student-profile">Student Profile</Label>
          <Textarea
            id="student-profile"
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            placeholder="Describe learning style, strengths, weaknesses..."
            rows={3}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="past-performance">Past Performance</Label>
          <Textarea
            id="past-performance"
            value={pastPerformance}
            onChange={(e) => setPastPerformance(e.target.value)}
            placeholder="Enter recent grades, test scores, etc."
            rows={3}
          />
        </div>
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Recommendations
        </Button>
        {recommendations && (
          <ScrollArea className="h-[150px] w-full rounded-md border p-4">
             <h4 className="mb-2 font-medium text-lg">Your Personalized Path:</h4>
            <div className="whitespace-pre-wrap text-sm">{recommendations}</div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
