
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, CalendarOff, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const managementSections = [
    {
        title: "Staff Records",
        description: "Add, edit, and manage all faculty profiles and details.",
        href: "/dashboard/admin/staff/records",
        icon: UserCheck,
    },
    {
        title: "Leave Management",
        description: "Track and approve staff leave requests and view attendance.",
        href: "/dashboard/admin/staff/leave",
        icon: CalendarOff,
    },
    {
        title: "Performance Appraisals",
        description: "View and manage performance reviews and appraisal records.",
        href: "/dashboard/admin/staff/appraisals",
        icon: LineChart,
    }
];

export default function StaffManagementHubPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold">Staff Management Hub</h1>
                <p className="text-muted-foreground">
                    Central access to all faculty-related administrative tasks.
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
