export class User{
    id:number;
    name:string;
    email:string;
    phoneNumber:string;
    password:string;

    constructor(obj:any){
        this.id = obj.Id != null ? obj.id : null;
        this.name = obj.name != null ? obj.name:null;
        this.email = obj.email != null ? obj.name:null;
        this.phoneNumber = obj.phoneNumber != null? obj.phoneNumber:null;
        this.password = obj.password != null? obj.password:null;
    }
}