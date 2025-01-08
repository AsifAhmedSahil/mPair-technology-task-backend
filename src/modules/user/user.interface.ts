export interface TUser {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "others";
  image: string;
  employeeId: string;
  position: string;
}
