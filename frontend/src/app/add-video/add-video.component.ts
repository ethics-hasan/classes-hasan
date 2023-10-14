import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebRequestService} from '../shared/web-request.service';
import {Router} from '@angular/router';

interface Subject {
  value: string;
  viewValue: string;
}

interface Streams {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  selectedValue: string;
  selectedStreamValue: string;

  constructor(
    private webRequestService: WebRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    this.webRequestService.addVideo(form.value).subscribe((res) => {
      this.router.navigateByUrl('/manage-videos')
    })
  }

}
