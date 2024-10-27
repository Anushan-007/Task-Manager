import { IAddress } from "./IAddress";

export interface IUser{
    filter(): any;
    id:number;
    name:string;
    email:string;
    phoneNumber:string;
    password:string;
    addresses?: IAddress;
}

