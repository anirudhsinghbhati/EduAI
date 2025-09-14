export type Student = {
  id: string;
  name: string;
  imageUrl: string;
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
      { id: "s1", name: "Alice Johnson", imageUrl: "https://picsum.photos/seed/s1/200/200" },
      { id: "s3", name: "Charlie Brown", imageUrl: "https://picsum.photos/seed/s3/200/200" },
      { id: "s5", name: "Ethan Davis", imageUrl: "https://picsum.photos/seed/s5/200/200" },
      { id: "s7", name: "George Rodriguez", imageUrl: "https://picsum.photos/seed/s7/200/200" },
    ],
  },
  {
    id: "c2",
    name: "Grade 11 Physics",
    students: [
        { id: "s2", name: "Bob Williams", imageUrl: "https://picsum.photos/seed/s2/200/200" },
        { id: "s4", name: "Diana Miller", imageUrl: "https://picsum.photos/seed/s4/200/200" },
        { id: "s6", name: "Fiona Garcia", imageUrl: "https://picsum.photos/seed/s6/200/200" },
        { id: "s8", name: "Hannah Wilson", imageUrl: "https://picsum.photos/seed/s8/200/200" },
    ],
  },
];
