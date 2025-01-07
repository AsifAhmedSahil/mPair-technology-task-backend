export interface TUser  {
    name:string;
    email:string;
    password:string;
    dateOfBirth:Date;
    gender:'male' | 'female'| 'others';
    employeeId:string;
    position:string;
    

}