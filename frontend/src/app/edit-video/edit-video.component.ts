import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {WebRequestService} from '../shared/web-request.service';

interface Subject {
  value: string;
  viewValue: string;
}

interface Streams {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  videoData: any
  videoid: string

  constructor(
    private webRequestService: WebRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.videoid =paramMap.get('id');
      this.webRequestService.getVideo(this.videoid).subscribe((res) => {
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
    this.webRequestService.updateVideo(form.value, this.videoid).subscribe((res) => {
      this.router.navigateByUrl('manage-videos');
    });
  }

}
