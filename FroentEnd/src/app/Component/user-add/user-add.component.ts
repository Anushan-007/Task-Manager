import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../Models/Task';
import { User } from '../../Models/User';
import { IUser } from '../../Interfaces/IUser';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css',
})
export class UserAddComponent implements OnInit {
  isEditForm: boolean = false;

  onCancel() {
    this.router.navigate(['/admin/user-list']);
  }
  CurrentID!: number;
  userAddForm: any;
  currentUser!: IUser;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateService: ActivatedRoute
  ) {
    this.CurrentID = Number(this.ActivateService.snapshot.paramMap.get('id'));
    if (this.CurrentID) {
      this.isEditForm = true;
    }
    this.userAddForm = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      addresses: this.fb.group({
        id: ['0', []],
        line1: ['', [Validators.required]],
        street: ['', []],
        city: ['', []],
      }),
      
    });
  }
  ngOnInit(): void {
    if (this.CurrentID) {
      this.userService.getUserbyId(this.CurrentID).subscribe((data) => {
        this.currentUser = data;
        console.log(this.currentUser);
        this.userAddForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.isEditForm == false) {
      console.log('Add');

      let user = this.userAddForm.value;
      user.id = 0;
      this.userService.createUser(user).subscribe((data) => {
        this.router.navigate(['/admin/user-list']);
        this.toastr.success('User Created Successfully', 'User');
      });
    } else if (this.isEditForm == true) {
      console.log('Edit');

      const user = this.userAddForm.value;
      console.log(user);

      this.userService
        .updateUser(user, this.currentUser.id)
        .subscribe((data) => {
          this.toastr.success('User is Updated Successfully', 'Updated');
          this.router.navigate(['/admin/user-list']);
        });
    }
  }
}
