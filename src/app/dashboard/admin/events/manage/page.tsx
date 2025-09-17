
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus } from "lucide-react";

export default function EventManagementPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarPlus className="w-5 h-5 text-primary" />
                    Event Management
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to create and manage school events here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Event management system coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
