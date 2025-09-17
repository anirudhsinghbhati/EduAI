
export type PerformanceRecord = {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  subject: string;
  grade: number; // Percentage
  term: 'Term 1' | 'Term 2' | 'Final';
  teacherId: string;
  teacherName: string;
  remarks: string;
};

export const initialPerformanceData: PerformanceRecord[] = [
  // Grade 10 Math students
  { id: "p1", studentId: "s1", studentName: "Alice Johnson", classId: "c1", className: "Grade 10 Math", subject: "Mathematics", grade: 88, term: "Term 1", teacherId: "t1", teacherName: "Mr. David Chen", remarks: "Excellent progress in algebra." },
  { id: "p2", studentId: "s3", studentName: "Charlie Brown", classId: "c1", className: "Grade 10 Math", subject: "Mathematics", grade: 72, term: "Term 1", teacherId: "t1", teacherName: "Mr. David Chen", remarks: "Needs to focus more on geometry concepts." },
  { id: "p3", studentId: "s5", studentName: "Ethan Davis", classId: "c1", className: "Grade 10 Math", subject: "Mathematics", grade: 95, term: "Term 1", teacherId: "t1", teacherName: "Mr. David Chen", remarks: "Top performer, very intuitive." },
  { id: "p4", studentId: "s7", studentName: "George Rodriguez", classId: "c1", className: "Grade 10 Math", subject: "Mathematics", grade: 81, term: "Term 1", teacherId: "t1", teacherName: "Mr. David Chen", remarks: "Good understanding but can be more consistent." },
  
  // Grade 11 Physics students
  { id: "p5", studentId: "s2", studentName: "Bob Williams", classId: "c2", className: "Grade 11 Physics", subject: "Physics", grade: 92, term: "Term 1", teacherId: "t2", teacherName: "Ms. Maria Garcia", remarks: "Strong grasp of mechanics." },
  { id: "p6", studentId: "s4", studentName: "Diana Miller", classId: "c2", className: "Grade 11 Physics", subject: "Physics", grade: 85, term: "Term 1", teacherId: "t2", teacherName: "Ms. Maria Garcia", remarks: "Improving steadily in lab work." },
  { id: "p7", studentId: "s6", studentName: "Fiona Garcia", classId: "c2", className: "Grade 11 Physics", subject: "Physics", grade: 78, term: "Term 1", teacherId: "t2", teacherName: "Ms. Maria Garcia", remarks: "Struggles with thermodynamics, needs extra help." },
  { id: "p8", studentId: "s8", studentName: "Hannah Wilson", classId: "c2", className: "Grade 11 Physics", subject: "Physics", grade: 89, term: "Term 1", teacherId: "t2", teacherName: "Ms. Maria Garcia", remarks: "Very engaged in class discussions." },

  // Additional subjects for some students to show variety
  { id: "p9", studentId: "s1", studentName: "Alice Johnson", classId: "c-hist", className: "Grade 10 History", subject: "History", grade: 94, term: "Term 1", teacherId: "t3", teacherName: "Dr. Emily White", remarks: "Excellent analytical essays." },
  { id: "p10", studentId: "s2", studentName: "Bob Williams", classId: "c-eng", className: "Grade 11 English", subject: "English", grade: 88, term: "Term 1", teacherId: "t4", teacherName: "Mr. John Smith", remarks: "Strong writer, participates well." },
];
