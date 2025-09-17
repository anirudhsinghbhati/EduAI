
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AcademicCalendarPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Academic Calendar
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to manage the school's academic calendar here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Academic calendar system coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
