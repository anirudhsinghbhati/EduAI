
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBarChart } from "lucide-react";

export default function AttendanceReportPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileBarChart className="w-5 h-5 text-primary" />
                    Attendance Reports
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to generate detailed attendance reports here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Attendance analytics coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
