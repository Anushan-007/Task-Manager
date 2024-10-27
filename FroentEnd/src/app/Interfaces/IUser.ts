import { IAddress } from "./IAddress";
import { ITask } from "./ITask";

export interface IUser{
    // filter(): any;
    id:number;
    name:string;
    email:string;
    phoneNumber:string;
    password:string;
    addresses?: IAddress;
    tasks?:ITask[];
}

