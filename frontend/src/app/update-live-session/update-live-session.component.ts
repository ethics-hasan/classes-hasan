import { Component, OnInit } from '@angular/core';
import {WebRequestService} from '../shared/web-request.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

interface Subject {
  value: string;
  viewValue: string;
}

interface Streams {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-live-session',
  templateUrl: './update-live-session.component.html',
  styleUrls: ['./update-live-session.component.scss']
})
export class UpdateLiveSessionComponent implements OnInit {
  videoData: any
  videoid: string

  constructor(
    private webRequestService: WebRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.videoid =paramMap.get('id');
      this.webRequestService.getLiveSessionById(this.videoid).subscribe((res) => {
        console.log(res)
        this.videoData = res[0];
      });
    })
  }

  subjects: Subject[] = [
    {value: 'history', viewValue: 'History'},
    {value: 'geography', viewValue: 'Geography'},
    {value: 'english', viewValue: 'English'},
    {value: 'math', viewValue: 'Math'},
    {value: 'science', viewValue: 'Science'},
  ];

  streams: Streams[] = [
    {value: 'arts', viewValue: 'Arts'},
    {value: 'commerce', viewValue: 'Commerce'},
    {value: 'science', viewValue: 'Science'}
  ];

  onSubmit(form: NgForm) {
    this.webRequestService.updateLiveSession(this.videoid, form.value).subscribe((res) => {
      this.router.navigateByUrl('admin/manage-live-session');
    });
  }

}
