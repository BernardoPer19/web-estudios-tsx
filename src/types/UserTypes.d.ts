import { CourseType } from "./CourseType";

export interface UserFirebase {
  uid: string;
  coursesEnrolled: CourseType[];
  createAT: number;
  email: string;
  password: string;
  role: Role;
}


export type TeacherType = {
    name: string;
    img: string;
}

export type RoleType = "student" | "teacher";
