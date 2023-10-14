import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {WebRequestService} from '../shared/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private webRequestService:WebRequestService,
  private router:Router
  ) {
  }
  canActivate(){
    if(this.webRequestService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login'])
    return false
  }

}
