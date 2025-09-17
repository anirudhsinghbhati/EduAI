
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, BookOpenCheck, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const managementSections = [
    {
        title: "Subjects & Semesters",
        description: "Define and organize all courses, subjects, and academic terms.",
        href: "/dashboard/admin/courses/subjects",
        icon: BookCopy,
    },
    {
        title: "Syllabus & Lesson Plans",
        description: "Upload and manage syllabus documents and lesson plans for each course.",
        href: "/dashboard/admin/courses/syllabus",
        icon: BookOpenCheck,
    },
    {
        title: "Timetable Management",
        description: "Create and manage the master timetable for all classes and subjects.",
        href: "/dashboard/admin/timetable",
        icon: CalendarDays,
    }
];

export default function CourseManagementHubPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold">Course & Curriculum Hub</h1>
                <p className="text-muted-foreground">
                    Central hub for managing academic structure, from subjects to schedules.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {managementSections.map((section) => (
                    <Card key={section.title} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="w-6 h-6 text-primary" />
                                {section.title}
                            </CardTitle>
                            <CardDescription>{section.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end">
                            <Button asChild className="w-full">
                                <Link href={section.href}>
                                    Go to {section.title}
                                    <ArrowRight className="ml-2" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
