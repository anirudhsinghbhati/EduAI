
export type TimetableEntry = {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string; // e.g., "09:00 - 10:00"
  subject: string;
  teacherId: string;
  classId: string;
};

export const initialTimetable: TimetableEntry[] = [
  { id: "tt1", day: "Monday", time: "09:00 - 10:00", subject: "Mathematics", teacherId: "t1", classId: "c1" },
  { id: "tt2", day: "Monday", time: "10:00 - 11:00", subject: "Physics", teacherId: "t2", classId: "c2" },
  { id: "tt3", day: "Tuesday", time: "09:00 - 10:00", subject: "Physics", teacherId: "t2", classId: "c2" },
  { id: "tt4", day: "Tuesday", time: "11:00 - 12:00", subject: "History", teacherId: "t3", classId: "c1" },
  { id: "tt5", day: "Wednesday", time: "10:00 - 11:00", subject: "Mathematics", teacherId: "t1", classId: "c1" },
  { id: "tt6", day: "Wednesday", time: "11:00 - 12:00", subject: "English", teacherId: "t4", classId: "c2" },
  { id: "tt7", day: "Thursday", time: "09:00 - 10:00", subject: "History", teacherId: "t3", classId: "c1" },
  { id: "tt8", day: "Friday", time: "10:00 - 11:00", subject: "English", teacherId: "t4", classId: "c2" },
];
