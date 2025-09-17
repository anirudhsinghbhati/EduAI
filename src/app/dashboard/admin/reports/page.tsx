
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBarChart, Users, BarChart2, Banknote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const reportSections = [
    {
        title: "Attendance Reports",
        description: "View daily, weekly, and monthly attendance records.",
        href: "/dashboard/admin/reports/attendance",
        icon: FileBarChart,
    },
    {
        title: "Performance Analysis",
        description: "Analyze student performance by class, subject, or teacher.",
        href: "/dashboard/admin/reports/performance",
        icon: BarChart2,
    },
    {
        title: "Enrollment Statistics",
        description: "Track admission trends and enrollment data.",
        href: "/dashboard/admin/reports/enrollment",
        icon: Users,
    },
    {
        title: "Financial Reports",
        description: "Generate fee collection and outstanding balance reports.",
        href: "/dashboard/admin/reports/financial",
        icon: Banknote,
    }
];

export default function ReportsHubPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold">Reports & Analytics Hub</h1>
                <p className="text-muted-foreground">
                    Access comprehensive reports and data visualizations.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {reportSections.map((section) => (
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
                                    View {section.title}
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
