import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { WebRequestService } from '../shared/web-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users:any=[];

  constructor(private webRequestService: WebRequestService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.webRequestService.getUsers().subscribe((res:any)=>{
      this.users = res;
      var userId=this.authService.getUserId();
      var user:any;
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i]['_id']==userId){
          user=this.users[i];
        }
      }
      if(user['isAdmin']){
        this.router.navigate(['/home']);
      }
      else{
        this.router.navigate(['/student']);
      }
    });
  }

  deleteUser(id: string, name: string) {
    if(confirm("Are you sure to delete "+name + "?")) {
      return this.webRequestService.deleteUser(id).subscribe((res) => {
        const userIndex = this.users.findIndex(u => u._id === id)
        if (userIndex == -1) return
        this.users.splice(userIndex, 1)
      })
    }
  }
}
