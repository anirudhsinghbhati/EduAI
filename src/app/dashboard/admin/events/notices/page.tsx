
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export default function NoticesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    Notices & Circulars
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to publish and manage official school notices here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Notice management system coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
