import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoalSetting } from "./components/goal-setting";
import { LearningRecommendations } from "./components/learning-recommendations";
import { Badge } from "@/components/ui/badge";
import { Activity, BookOpen, CheckCircle, Target, Clock, Award, TrendingUp } from "lucide-react";

const upcomingClasses = [
    { time: "10:00 AM", subject: "Mathematics", topic: "Algebra II - Functions", location: "Room 201" },
    { time: "11:30 AM", subject: "Physics", topic: "Newton's Laws of Motion", location: "Lab B" },
    { time: "01:30 PM", subject: "History", topic: "The Renaissance Period", location: "Room 305" },
];

const courseProgress = [
    { subject: "Mathematics", progress: 88, color: "bg-blue-500" },
    { subject: "Physics", progress: 95, color: "bg-purple-500" },
    { subject: "History", progress: 76, color: "bg-amber-500" },
    { subject: "English Literature", progress: 82, color: "bg-green-500" },
];


export default function StudentDashboardPage() {
  return (
    <div className="grid gap-8">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold">Welcome Back, Alex!</h1>
            <p className="text-muted-foreground">Here's your summary for today. Keep up the great work!</p>
        </div>

        {/* Top Row: Quick Stats */}
        <div className="grid gap-6 md:grid-cols-3">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">2 days absent this semester</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">3.85</div>
                <p className="text-xs text-muted-foreground">+0.1 from last semester</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">12/15 Done</div>
                <p className="text-xs text-muted-foreground">3 pending for this week</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
             {/* Left Column: Schedule and Goals */}
            <div className="lg:col-span-2 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Upcoming Classes
                        </CardTitle>
                        <CardDescription>Your schedule for today, October 26th.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcomingClasses.map((item, index) => (
                             <div key={index} className="flex items-start gap-4">
                                <div className="text-right">
                                    <p className="font-bold text-primary">{item.time}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-2.5 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                                    <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1/2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-semibold">{item.subject}</p>
                                    <p className="text-sm text-muted-foreground">{item.topic}</p>
                                    <p className="text-xs text-muted-foreground">{item.location}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <GoalSetting />
            </div>

            {/* Right Column: Progress and AI */}
            <div className="lg:col-span-1 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Course Progress
                        </CardTitle>
                         <CardDescription>Your progress in key subjects.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {courseProgress.map(course => (
                             <div key={course.subject} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">{course.subject}</p>
                                    <p className="text-sm font-bold">{course.progress}%</p>
                                </div>
                                <Progress value={course.progress} indicatorClassName={course.color} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <LearningRecommendations />
            </div>
        </div>
    </div>
  );
}
