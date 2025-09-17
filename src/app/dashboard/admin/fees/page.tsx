
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialFeeData, type FeeRecord } from "@/app/lib/fees";
import { studentRoster as initialClassRoster, type ClassGroup } from "@/app/lib/student-roster";
import { CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const LOCAL_STORAGE_FEES_KEY = 'feeRecords';
const LOCAL_STORAGE_STUDENT_KEY = 'studentRoster';

export default function FeeManagementPage() {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedFees = localStorage.getItem(LOCAL_STORAGE_FEES_KEY);
      setFeeRecords(savedFees ? JSON.parse(savedFees) : initialFeeData);

      const savedClasses = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
      setClasses(savedClasses ? JSON.parse(savedClasses) : initialClassRoster);
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setFeeRecords(initialFeeData);
      setClasses(initialClassRoster);
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_FEES_KEY, JSON.stringify(feeRecords));
    } catch (error) {
        console.error("Failed to save fee records to localStorage", error);
    }
  }, [feeRecords]);
  
  const handlePaymentStatusChange = (recordId: string, newStatus: FeeRecord['status']) => {
    const updatedRecords = feeRecords.map(record => {
      if (record.id === recordId) {
        return { ...record, status: newStatus };
      }
      return record;
    });
    setFeeRecords(updatedRecords);
    toast({
        title: "✅ Status Updated",
        description: `Fee record has been marked as ${newStatus}.`,
    });
  };

  const filteredRecords = useMemo(() => {
    if (selectedClassId === "all") {
      return feeRecords;
    }
    const selectedClass = classes.find(c => c.id === selectedClassId);
    if (!selectedClass) return [];
    
    const studentIdsInClass = selectedClass.students.map(s => s.id);
    return feeRecords.filter(record => studentIdsInClass.includes(record.studentId));
  }, [selectedClassId, feeRecords, classes]);
  
  const statusConfig: Record<FeeRecord['status'], { variant: "default" | "secondary" | "destructive" | "outline", icon: React.ElementType, label: string }> = {
    Paid: { variant: "default", icon: CheckCircle, label: "Paid" },
    Unpaid: { variant: "destructive", icon: XCircle, label: "Unpaid" },
    Overdue: { variant: "outline", icon: Clock, label: "Overdue" },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Fee Management
            </CardTitle>
            <CardDescription>
              View and update student fee payment statuses.
            </CardDescription>
          </div>
          <div className="w-full sm:w-64">
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by class..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Amount (USD)</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map(record => {
                const config = statusConfig[record.status];
                return (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.studentName}</TableCell>
                    <TableCell>{record.className}</TableCell>
                    <TableCell className="text-right">${record.amount.toFixed(2)}</TableCell>
                    <TableCell>{format(new Date(record.dueDate), "MMM dd, yyyy")}</TableCell>
                    <TableCell className="text-center">
                       <Badge variant={config.variant}>
                          <config.icon className="mr-1 h-3 w-3" />
                          {config.label}
                       </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       {record.status !== 'Paid' && (
                         <Button
                           size="sm"
                           onClick={() => handlePaymentStatusChange(record.id, 'Paid')}
                         >
                           Mark as Paid
                         </Button>
                       )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No fee records found for the selected class.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
