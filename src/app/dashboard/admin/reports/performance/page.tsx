
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function PerformanceAnalysisPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-primary" />
                    Performance Analysis
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to analyze academic performance data here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Performance analytics coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
