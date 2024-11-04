export interface IUserRegister{
    id:number;
    fullName:string;
    email:string;
    password:string;
    roles:any;
}

export enum Roles{
    Admin,
    Editor,
    Viewer
}