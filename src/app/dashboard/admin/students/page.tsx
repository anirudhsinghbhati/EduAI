
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const managementSections = [
    {
        title: "Student Records",
        description: "Add, edit, and manage all student profiles and class groups.",
        href: "/dashboard/admin/roster",
        icon: Users,
    },
    {
        title: "Enrollment Applications",
        description: "Review and process new student admission applications.",
        href: "/dashboard/admin/enrollment",
        icon: FileText,
    },
    {
        title: "Performance Reports",
        description: "View academic reports, grades, and class averages.",
        href: "/dashboard/admin/performance",
        icon: BarChart2,
    }
];

export default function StudentManagementHubPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold">Student Management Hub</h1>
                <p className="text-muted-foreground">
                    Central access to all student-related administrative tasks.
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
