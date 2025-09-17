
export type EnrollmentApplication = {
  id: string;
  studentName: string;
  studentAge: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  previousSchool: string;
  applicationDate: string; // ISO string format
  status: 'Pending' | 'Approved' | 'Rejected';
};

export const initialEnrollmentData: EnrollmentApplication[] = [
  {
    id: "e1",
    studentName: "Olivia Martinez",
    studentAge: 15,
    parentName: "Sophia Martinez",
    parentEmail: "sophia.m@example.com",
    parentPhone: "345-678-9012",
    previousSchool: "Northwood Middle School",
    applicationDate: "2024-08-20T00:00:00.000Z",
    status: "Pending",
  },
  {
    id: "e2",
    studentName: "Liam Thompson",
    studentAge: 16,
    parentName: "James Thompson",
    parentEmail: "james.t@example.com",
    parentPhone: "456-789-0123",
    previousSchool: "Lincoln High School",
    applicationDate: "2024-08-18T00:00:00.000Z",
    status: "Approved",
  },
  {
    id: "e3",
    studentName: "Noah King",
    studentAge: 15,
    parentName: "William King",
    parentEmail: "william.k@example.com",
    parentPhone: "567-890-1234",
    previousSchool: "Eastside Preparatory",
    applicationDate: "2024-08-15T00:00:00.000Z",
    status: "Pending",
  },
  {
    id: "e4",
    studentName: "Emma Wright",
    studentAge: 17,
    parentName: "Ava Wright",
    parentEmail: "ava.w@example.com",
    parentPhone: "678-901-2345",
    previousSchool: "Central City High",
    applicationDate: "2024-08-12T00:00:00.000Z",
    status: "Rejected",
  },
   {
    id: "e5",
    studentName: "James Green",
    studentAge: 16,
    parentName: "Lucas Green",
    parentEmail: "lucas.g@example.com",
    parentPhone: "789-012-3456",
    previousSchool: "Westwood High",
    applicationDate: "2024-08-10T00:00:00.000Z",
    status: "Pending",
  },
];
