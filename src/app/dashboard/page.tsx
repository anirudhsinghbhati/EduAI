import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoalSetting } from "./student/components/goal-setting";
import { LearningRecommendations } from "./student/components/learning-recommendations";
import { Badge } from "@/components/ui/badge";
import { Activity, BookOpen, CheckCircle, Target } from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Attendance Summary
          </CardTitle>
          <CardDescription>Your attendance for this month.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Attendance</span>
            <span className="text-lg font-bold text-primary">92%</span>
          </div>
          <Progress value={92} aria-label="92% attendance" />
           <div className="flex justify-between text-sm text-muted-foreground">
            <span>Punctuality Score: 98%</span>
            <span>Absences: 2 days</span>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Today&apos;s Tasks
          </CardTitle>
          <CardDescription>Assignments and recommendations for today.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
            <div>
              <p className="font-medium">Complete Physics Chapter 3</p>
              <p className="text-sm text-muted-foreground">Due: 11:59 PM</p>
            </div>
            <Badge>High Priority</Badge>
          </div>
           <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
            <div>
              <p className="font-medium">Review AI recommendation on Algebra</p>
              <p className="text-sm text-muted-foreground">Topic: Polynomials</p>
            </div>
            <Badge variant="outline">AI Suggested</Badge>
          </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-3 grid gap-6 md:grid-cols-2">
        <GoalSetting />
        <LearningRecommendations />
      </div>

       <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Subjects Overview
          </CardTitle>
          <CardDescription>Your progress in key subjects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between"><p>Mathematics</p><p>88%</p></div>
              <Progress value={88} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><p>Physics</p><p>95%</p></div>
              <Progress value={95} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><p>History</p><p>76%</p></div>
              <Progress value={76} />
            </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Streaks & Badges
          </CardTitle>
          <CardDescription>Stay motivated with your achievements.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl border-4 border-primary">
                  15
                </div>
                <p className="font-medium">Day Streak</p>
            </div>
            <div className="flex gap-4">
                <div className="p-3 rounded-full bg-accent/20 text-accent" title="Perfect Attendance">📅</div>
                <div className="p-3 rounded-full bg-accent/20 text-accent" title="Top Performer">🏆</div>
                <div className="p-3 rounded-full bg-muted" title="Locked">❓</div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
