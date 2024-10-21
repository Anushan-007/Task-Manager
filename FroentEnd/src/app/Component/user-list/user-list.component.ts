import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../Interfaces/IUser';
import { UserService } from '../../Services/user.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../Models/User';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

User: IUser[] =[]

constructor(private userService: UserService, private router:Router, private toastr:ToastrService){

}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next:(res:any) => {
        let response = res.map((user:any) => new User(user));
        this.User = res;
        
      },
      complete: () => {

      },
      error(err:any) {
        console.log(err);      
      },
    })
  }



}
