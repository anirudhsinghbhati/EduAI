import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";
import { AtRiskStudentDetector } from "./components/at-risk-student-detector";

export default function CounselorDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                     <HeartHandshake className="w-8 h-8 text-primary" />
                    Counselor Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Tools for student well-being and academic success.
                </p>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AtRiskStudentDetector />
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Upcoming Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground text-center">
                                Appointment scheduling and career guidance tools coming soon!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
