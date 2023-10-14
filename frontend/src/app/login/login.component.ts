import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import { WebRequestService } from '../shared/web-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  users:any=[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private webRequestService: WebRequestService
  ) { }

  ngOnInit(): void {
    this.webRequestService.getUsers().subscribe((res:any)=>{
      this.users = res;
      var userId=this.authService.getUserId();
      var user:any;
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i]['_id']==userId){
          user=this.users[i];
          break;
        }
      }
      if(user['isAdmin']){
        this.router.navigate(['/home']);
      }
      else{
        this.router.navigate(['/student-home']);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully
        if (res.body.isAdmin) {
          this.router.navigate(['/home']);
          }else{
            this.router.navigate(['/student']);
          }
      } else {
        console.log(res)
      }
    });
  }
}
