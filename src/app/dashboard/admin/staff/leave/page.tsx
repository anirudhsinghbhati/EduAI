
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarOff } from "lucide-react";

export default function LeaveManagementPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarOff className="w-5 h-5 text-primary" />
                    Leave Management
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to manage staff leave and attendance here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Leave management coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
