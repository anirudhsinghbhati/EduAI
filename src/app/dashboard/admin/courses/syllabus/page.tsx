
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck } from "lucide-react";

export default function SyllabusPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-primary" />
                    Syllabus & Lesson Plans
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to upload and manage syllabus documents and lesson plans here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Syllabus management system coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
