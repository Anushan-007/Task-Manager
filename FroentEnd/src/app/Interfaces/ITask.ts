import { ICheckList } from "./ICheckList";
import { IUser } from "./IUser";

export interface ITask{
    id:number;
    title:string;
    description:string;
    dueDate:string;
    priority:string;
    user?:IUser
    CheckList? : ICheckList[];
}