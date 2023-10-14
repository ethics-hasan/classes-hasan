import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {WebRequestService} from '../shared/web-request.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

interface Subject {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  videos: any = []
  unsafeUrl: any
  standard: string;
  stream: string;
  selectedValue: string;
  filteredVideos: any = []

  constructor(
    private authService: AuthService,
    private router: Router,
    private webRequestService: WebRequestService,
    private sanitizer: DomSanitizer
  ) {
    this.getVideos()
  }

  ngOnInit(): void {
    var auth=null;
    this.unsafeUrl = this.getSafeUrl('https://www.youtube.com/embed/tI_sdbnSw7c')
    auth=this.authService.getAccessToken();
    this.standard = localStorage.getItem('standard');
    this.stream = localStorage.getItem('stream');

    if (auth!==null) {
      this.webRequestService.getStdWiseVideos(this.standard, this.stream).subscribe((res: any) => {
        console.log(res);
      })
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  subjects: Subject[] = [
    {value: 'all', viewValue: 'All'},
    {value: 'history', viewValue: 'History'},
    {value: 'geography', viewValue: 'Geography'},
    {value: 'english', viewValue: 'English'},
    {value: 'math', viewValue: 'Math'},
    {value: 'science', viewValue: 'Science'},
  ];

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getVideos() {
    this.standard = localStorage.getItem('standard');
    this.stream = localStorage.getItem('stream');
    return this.webRequestService.getStdWiseVideos(this.standard, this.stream).subscribe((res: any) => {
      this.videos = res;
      for (let i=0; i<= res.length; i++) {
        this.videos[i].videolink = this.getSafeUrl(this.videos[i].videolink)
      }
    });
  }

  selectSubject(event: any) {
    console.log(event.value);
    if (event.value === 'all') {
      return this.getVideos();
    }
    return this.webRequestService.getubjectWiseRecordedSession(this.standard, this.stream, event.value).subscribe((res: any) => {
      this.filteredVideos = res;
      if (res.length === 0 ) {
        alert('No Videos Found for ' + event.value);
      }
      for (let i=0; i < res.length; i++) {
        this.filteredVideos[i].videolink = this.getSafeUrl(this.filteredVideos[i].videolink)
      }
      this.videos = this.filteredVideos;
    })
  }
}
