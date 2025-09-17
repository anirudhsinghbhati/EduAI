
export type Teacher = {
  id: string;
  name: string;
  imageUrl: string;
  subject: string;
  email: string;
  phone: string;
};

export const teacherRoster: Teacher[] = [
  { id: "t1", name: "Mr. David Chen", imageUrl: "https://picsum.photos/seed/t1/200/200", subject: "Mathematics", email: "david.chen@school.edu", phone: "555-0101" },
  { id: "t2", name: "Ms. Maria Garcia", imageUrl: "https://picsum.photos/seed/t2/200/200", subject: "Physics", email: "maria.garcia@school.edu", phone: "555-0102" },
  { id: "t3", name: "Dr. Emily White", imageUrl: "https://picsum.photos/seed/t3/200/200", subject: "History", email: "emily.white@school.edu", phone: "555-0103" },
  { id: "t4", name: "Mr. John Smith", imageUrl: "https://picsum.photos/seed/t4/200/200", subject: "English", email: "john.smith@school.edu", phone: "555-0104" },
];
