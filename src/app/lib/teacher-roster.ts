
export type Teacher = {
  id: string;
  name: string;
  imageUrl: string;
  subject: string;
};

export const teacherRoster: Teacher[] = [
  { id: "t1", name: "Mr. David Chen", imageUrl: "https://picsum.photos/seed/t1/200/200", subject: "Mathematics" },
  { id: "t2", name: "Ms. Maria Garcia", imageUrl: "https://picsum.photos/seed/t2/200/200", subject: "Physics" },
  { id: "t3", name: "Dr. Emily White", imageUrl: "https://picsum.photos/seed/t3/200/200", subject: "History" },
  { id: "t4", name: "Mr. John Smith", imageUrl: "https://picsum.photos/seed/t4/200/200", subject: "English" },
];
