import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WebRequestService} from '../shared/web-request.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-manage-live-sessions',
  templateUrl: './manage-live-sessions.component.html',
  styleUrls: ['./manage-live-sessions.component.scss']
})
export class ManageLiveSessionsComponent implements OnInit {
  standard: string;
  stream: string;
  videos: any = [];

  constructor(
    private router: Router,
    private webRequestService: WebRequestService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getLiveSession();
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getLiveSession() {
    this.standard = localStorage.getItem('standard');
    this.stream = localStorage.getItem('stream');
    return this.webRequestService.getLiveSessions().subscribe((res: any) => {
      this.videos = res;
      res.forEach((res:any,index:number)=>{
        console.log(this.videos[index].videolink);
        this.videos[index].videolink = this.getSafeUrl(this.videos[index].videolink);
      });
    });
  }

  deleteLiveSession(id: string, title: string) {
    if(confirm("Are you sure to delete "+ title + "?")) {
      return this.webRequestService.deleteLiveSession(id).subscribe((res) => {
        const videoIndex = this.videos.findIndex(v => v._id === id)
        if (videoIndex == -1) return
        this.videos.splice(videoIndex, 1)
      })
    }
  }

  updateLiveSession(id: string) {
    this.router.navigate(['/admin/update-live-session/', id]);
  }

}
