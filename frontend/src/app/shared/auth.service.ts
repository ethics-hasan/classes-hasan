import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private webRequestService: WebRequestService,
    private router: Router
  ) { }


  login(username: string, password: string) {
    return this.webRequestService.login(username, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.isAdmin(res.body.isAdmin);
        if (res.body.isAdmin === false) {
          this.setStandardAndStream(res.body.standard, res.body.stream);
        }
      })
    )
  }

  signup(name: string, password: string,username: string,contact: string,email: string,standard:string,stream:string) {
    // console.log("DATA In AUTH SERVICE",data)
    return this.webRequestService.signup(name,password,username,contact,email,standard,stream).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('stream');
    localStorage.removeItem('standard');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webRequestService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }

  isAdmin(admin: string) {
    localStorage.setItem('isAdmin', admin);
  }
  checkIsAdmin():boolean{
    const isAdmin=localStorage.getItem('isAdmin')
    if(isAdmin=='true'){
      return true
    }
    else{
      return false
    }
  }

  setStandardAndStream(standard: string, stream: string) {
    localStorage.setItem('stream', stream);
    localStorage.setItem('standard', standard);
  }
}
