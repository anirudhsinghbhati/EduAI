
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ParentDashboardPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Parent Dashboard
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to view your child's progress, attendance, and communicate with teachers here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Parent portal coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
