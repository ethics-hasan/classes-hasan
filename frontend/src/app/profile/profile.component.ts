import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebRequestService} from '../shared/web-request.service';
import {Location} from '@angular/common';

interface Streams {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  selectedStreamValue: string;

  name: string;
  username: string;
  email: string;
  contact: number;
  standard: number;
  stream: string;

  userId: string;

  constructor(
    private webRequestService: WebRequestService,
    private _location: Location
  ) { }

  ngOnInit(): void {
     this.userId = localStorage.getItem('user-id');
    this.webRequestService.getUserInfo(this.userId).subscribe((res: any) => {
      res= res[0];
      this.name = res.name;
      this.username = res.username;
      this.email = res.email;
      this.contact = Number(res.contact);
      this.standard = Number(res.standard);
      this.stream = res.stream;
    })
  }

  streams: Streams[] = [
    {value: 'arts', viewValue: 'Arts'},
    {value: 'commerce', viewValue: 'Commerce'},
    {value: 'science', viewValue: 'Science'}
  ];

  onSubmit(form: NgForm) {
    this.webRequestService.updateProfile(form.value, this.userId).subscribe((res: any) => {
      this._location.back();
    })
  }

}
