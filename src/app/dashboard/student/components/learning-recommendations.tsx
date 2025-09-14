"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getLearningRecommendations } from "@/app/actions";
import { Loader2, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LearningRecommendations() {
  const [studentProfile, setStudentProfile] = useState("Struggling with Algebra, excels in Geometry. Prefers visual learning aids and interactive examples. Goal is to improve overall Math grade to an A.");
  const [pastPerformance, setPastPerformance] = useState("Last test score in Algebra: 65%. Consistently scores above 90% in Geometry. Homework completion rate is 80%.");
  const [recommendations, setRecommendations] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
       setRecommendations("");
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
          AI Learning Coach
        </CardTitle>
        <CardDescription>
          Get personalized study tips based on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate New Recommendations
        </Button>
        {isPending && !recommendations && (
             <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                <p>Analyzing your profile...</p>
            </div>
        )}
        {recommendations && (
           <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Your Personalized Path</AlertTitle>
                <AlertDescription className="whitespace-pre-wrap">
                    {recommendations}
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
