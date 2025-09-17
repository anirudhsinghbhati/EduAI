
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";

export default function CounselorDashboardPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-primary" />
                    Counselor Dashboard
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to manage student well-being, schedule appointments, and provide career guidance here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Counselor portal coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
