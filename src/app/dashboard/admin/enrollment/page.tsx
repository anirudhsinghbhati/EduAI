
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialEnrollmentData, type EnrollmentApplication } from "@/app/lib/enrollment";
import { FileText, CheckCircle, XCircle, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LOCAL_STORAGE_KEY = 'enrollmentRecords';

export default function EnrollmentPage() {
  const [applications, setApplications] = useState<EnrollmentApplication[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
      setApplications(savedRecords ? JSON.parse(savedRecords) : initialEnrollmentData);
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setApplications(initialEnrollmentData);
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications));
        window.dispatchEvent(new CustomEvent('enrollmentUpdated'));
    } catch (error) {
        console.error("Failed to save enrollment records to localStorage", error);
    }
  }, [applications]);
  
  const handleStatusChange = (recordId: string, newStatus: EnrollmentApplication['status']) => {
    const updatedRecords = applications.map(record => {
      if (record.id === recordId) {
        return { ...record, status: newStatus };
      }
      return record;
    });
    setApplications(updatedRecords);
    toast({
        title: "✅ Status Updated",
        description: `Application has been marked as ${newStatus}.`,
    });
  };

  const statusConfig: Record<EnrollmentApplication['status'], { variant: "default" | "secondary" | "destructive" | "outline", icon: React.ElementType, label: string }> = {
    Approved: { variant: "default", icon: CheckCircle, label: "Approved" },
    Rejected: { variant: "destructive", icon: XCircle, label: "Rejected" },
    Pending: { variant: "outline", icon: Clock, label: "Pending" },
  };

  const ApplicationTable = ({ statusFilter }: { statusFilter?: EnrollmentApplication['status'] }) => {
    const filteredApplications = statusFilter ? applications.filter(a => a.status === statusFilter) : applications;

    return (
        <div className="border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Parent Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {filteredApplications.map(app => {
                const config = statusConfig[app.status];
                return (
                <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.studentName} (Age: {app.studentAge})</TableCell>
                    <TableCell>{app.parentName}</TableCell>
                    <TableCell>
                        <div className="text-xs">{app.parentEmail}</div>
                        <div className="text-xs text-muted-foreground">{app.parentPhone}</div>
                    </TableCell>
                    <TableCell>{format(new Date(app.applicationDate), "MMM dd, yyyy")}</TableCell>
                    <TableCell className="text-center">
                    <Badge variant={config.variant}>
                        <config.icon className="mr-1 h-3 w-3" />
                        {config.label}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'Approved')}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'Rejected')}>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Reject
                            </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'Pending')}>
                                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                                Mark as Pending
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                );
            })}
            {filteredApplications.length === 0 && (
                <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                    No applications found with this status.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Enrollment Management
        </CardTitle>
        <CardDescription>
            Review and process new student applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <Tabs defaultValue="all">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
                <ApplicationTable />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
                <ApplicationTable statusFilter="Pending" />
            </TabsContent>
            <TabsContent value="approved" className="mt-4">
                <ApplicationTable statusFilter="Approved" />
            </TabsContent>
            <TabsContent value="rejected" className="mt-4">
                <ApplicationTable statusFilter="Rejected" />
            </TabsContent>
         </Tabs>
      </CardContent>
    </Card>
  );
}
