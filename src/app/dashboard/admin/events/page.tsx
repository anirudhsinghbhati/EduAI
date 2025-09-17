
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Megaphone, CalendarPlus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const managementSections = [
    {
        title: "Academic Calendar",
        description: "View and manage the official school academic calendar.",
        href: "/dashboard/admin/events/calendar",
        icon: Calendar,
    },
    {
        title: "Notices & Circulars",
        description: "Publish and manage official notices and circulars for all users.",
        href: "/dashboard/admin/events/notices",
        icon: Megaphone,
    },
    {
        title: "Event Management",
        description: "Create and manage school events like seminars and activities.",
        href: "/dashboard/admin/events/manage",
        icon: CalendarPlus,
    }
];

export default function EventsHubPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold">Events & Notices Hub</h1>
                <p className="text-muted-foreground">
                    Your central place for school-wide communication and scheduling.
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
