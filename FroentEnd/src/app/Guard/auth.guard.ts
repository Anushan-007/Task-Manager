import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { RegisterService } from '../Services/register.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate { 
  constructor(private registerService: RegisterService, private router: Router) {
  } 

  canActivate(): boolean { 
  if (this.registerService.isLoggedIn()) { 
  return true; 
  } else { 
  this.router.navigate(['/admin']); 
  return false; 
  } 
  }

  
  }
  
