
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";

export default function FinancialReportsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-primary" />
                    Financial Reports
                </CardTitle>
                <CardDescription>
                    This feature is under construction. Soon you will be able to generate financial reports here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Financial reports coming soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}
