export type StudentDocument = {
  id: string;
  name: string;
  url: string; // data URI for simplicity
  type: string; // e.g., 'application/pdf'
};

export type Student = {
  id: string;
  name: string;
  imageUrl: string;
  grade: number;
  email: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  documents?: StudentDocument[];
};

export type ClassGroup = {
  id: string;
  name: string;
  students: Student[];
};

export const studentRoster: ClassGroup[] = [
  {
    id: "c1",
    name: "Grade 10 Math",
    students: [
      { id: "s1", name: "Alice Johnson", imageUrl: "https://picsum.photos/seed/s1/200/200", grade: 10, email: "alice.j@example.com", emergencyContact: { name: "John Johnson", phone: "123-456-7890" }, documents: [] },
      { id: "s3", name: "Charlie Brown", imageUrl: "https://picsum.photos/seed/s3/200/200", grade: 10, email: "charlie.b@example.com", emergencyContact: { name: "Sally Brown", phone: "123-456-7891" }, documents: [] },
      { id: "s5", name: "Ethan Davis", imageUrl: "https://picsum.photos/seed/s5/200/200", grade: 10, email: "ethan.d@example.com", emergencyContact: { name: "Maria Davis", phone: "123-456-7892" }, documents: [] },
      { id: "s7", name: "George Rodriguez", imageUrl: "https://picsum.photos/seed/s7/200/200", grade: 10, email: "george.r@example.com", emergencyContact: { name: "Carlos Rodriguez", phone: "123-456-7893" }, documents: [] },
    ],
  },
  {
    id: "c2",
    name: "Grade 11 Physics",
    students: [
        { id: "s2", name: "Bob Williams", imageUrl: "https://picsum.photos/seed/s2/200/200", grade: 11, email: "bob.w@example.com", emergencyContact: { name: "Barbara Williams", phone: "234-567-8901" }, documents: [] },
        { id: "s4", name: "Diana Miller", imageUrl: "https://picsum.photos/seed/s4/200/200", grade: 11, email: "diana.m@example.com", emergencyContact: { name: "David Miller", phone: "234-567-8902" }, documents: [] },
        { id: "s6", name: "Fiona Garcia", imageUrl: "https://picsum.photos/seed/s6/200/200", grade: 11, email: "fiona.g@example.com", emergencyContact: { name: "Frank Garcia", phone: "234-567-8903" }, documents: [] },
        { id: "s8", name: "Hannah Wilson", imageUrl: "https://picsum.photos/seed/s8/200/200", grade: 11, email: "hannah.w@example.com", emergencyContact: { name: "Henry Wilson", phone: "234-567-8904" }, documents: [] },
    ],
  },
];
