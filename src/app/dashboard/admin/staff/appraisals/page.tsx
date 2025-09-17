
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function PerformanceAppraisalsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-primary" />
                    Performance Appraisals
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to manage staff performance reviews here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Performance appraisal system coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
