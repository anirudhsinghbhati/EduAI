
export type FeeRecord = {
    id: string;
    studentId: string;
    studentName: string;
    className: string;
    amount: number;
    dueDate: string; // ISO string format
    status: 'Paid' | 'Unpaid' | 'Overdue';
  };
  
  export const initialFeeData: FeeRecord[] = [
    { id: "f1", studentId: "s1", studentName: "Alice Johnson", className: "Grade 10 Math", amount: 20000, dueDate: "2024-09-15T00:00:00.000Z", status: "Paid" },
    { id: "f2", studentId: "s3", studentName: "Charlie Brown", className: "Grade 10 Math", amount: 20000, dueDate: "2024-09-15T00:00:00.000Z", status: "Unpaid" },
    { id: "f3", studentId: "s5", studentName: "Ethan Davis", className: "Grade 10 Math", amount: 20000, dueDate: "2024-08-01T00:00:00.000Z", status: "Overdue" },
    { id: "f4", studentId: "s7", studentName: "George Rodriguez", className: "Grade 10 Math", amount: 20000, dueDate: "2024-09-15T00:00:00.000Z", status: "Paid" },
    { id: "f5", studentId: "s2", studentName: "Bob Williams", className: "Grade 11 Physics", amount: 24000, dueDate: "2024-09-15T00:00:00.000Z", status: "Paid" },
    { id: "f6", studentId: "s4", studentName: "Diana Miller", className: "Grade 11 Physics", amount: 24000, dueDate: "2024-09-15T00:00:00.000Z", status: "Unpaid" },
    { id: "f7", studentId: "s6", studentName: "Fiona Garcia", className: "Grade 11 Physics", amount: 24000, dueDate: "2024-09-15T00:00:00.000Z", status: "Paid" },
    { id: "f8", studentId: "s8", studentName: "Hannah Wilson", className: "Grade 11 Physics", amount: 24000, dueDate: "2024-08-01T00:00:00.000Z", status: "Overdue" },
  ];
