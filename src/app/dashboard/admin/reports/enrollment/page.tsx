
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function EnrollmentStatisticsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Enrollment Statistics
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to view detailed enrollment statistics here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Enrollment statistics coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
