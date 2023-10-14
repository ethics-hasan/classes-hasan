import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private autheservice:AuthService
  ,  private router:Router) {
  }
  canActivate(){

      if(this.autheservice.checkIsAdmin()) {
        console.log("in IF",this.autheservice.checkIsAdmin())
      return true;
        }
      else {
        console.log("in Else")
        this.router.navigate(['student'])
        return false
      }
  }

}
