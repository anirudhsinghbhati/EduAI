
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy } from "lucide-react";

export default function SubjectsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookCopy className="w-5 h-5 text-primary" />
                    Subjects & Semesters
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to define courses, subjects, and academic terms here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Course definition system coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
