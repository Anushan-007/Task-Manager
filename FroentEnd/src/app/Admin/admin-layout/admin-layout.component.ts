import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyInterceptor } from '../../interceptors/my-interceptor.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
    ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {

  userName:string = '';
  ngOnInit(): void {
    const name = localStorage.getItem("name") || "";
    this.userName = name;
  }

  constructor(private router:Router, private toster:ToastrService){

  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
    this.toster.success("Logout Successfully", "LogOut")
  }

}
