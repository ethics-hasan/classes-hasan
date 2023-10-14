import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isLoggedIn: boolean;
  isAdmin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    let auth=null;
    auth=this.authService.getAccessToken();
    if (auth!==null) {
      this.isLoggedIn = true;
      const tp = localStorage.getItem('isAdmin');
      // @ts-ignore
      if (tp === 'true') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
    else{
      this.isLoggedIn = false;
    }
  }

  login() {
    return this.router.navigate(['/login']);
  }

  logout() {
    return this.authService.logout();
  }

  navigateToHome() {
    if (this.isAdmin) {
      console.log('inside if navigate to home');
      this.router.navigateByUrl('home');
    }
    else {
      console.log('inside else navigate to home');
      this.router.navigateByUrl('student');
    }
  }

}
