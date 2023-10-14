import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {WebRequestService} from '../shared/web-request.service';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-manage-videos',
  templateUrl: './manage-videos.component.html',
  styleUrls: ['./manage-videos.component.scss']
})
export class ManageVideosComponent implements OnInit {

  videos: any = []
  unsafeUrl: any

  subject: string
  std: string
  stream: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private webRequestService: WebRequestService,
    private sanitizer: DomSanitizer
  ) {
    this.getVideos()
  }

  ngOnInit(): void {
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getVideos() {
    return this.webRequestService.getVideos().subscribe((res: any) => {
      this.videos = res;
      for (let i=0; i<= res.length; i++) {
        this.videos[i].videolink = this.getSafeUrl(this.videos[i].videolink)
      }
    });
  }

  deleteVideo(id: string, title: string) {
    if(confirm("Are you sure to delete "+ title + "?")) {
      return this.webRequestService.deleteVideo(id).subscribe((res) => {
        const videoIndex = this.videos.findIndex(v => v._id === id)
        if (videoIndex == -1) return
        this.videos.splice(videoIndex, 1)
      })
    }
  }

  editVideo(id: string) {
    this.router.navigate(['/edit-video', id]);
  }


}
