import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {HomeComponent} from './home/home.component';
import {RegisterStudentComponent} from './register-student/register-student.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import {AddVideoComponent} from './add-video/add-video.component';
import {ManageVideosComponent} from './manage-videos/manage-videos.component';
import {EditVideoComponent} from './edit-video/edit-video.component';
import {StudentNavComponent} from './student-nav/student-nav.component';
import {LiveSessionComponent} from './live-session/live-session.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProfileComponent} from './profile/profile.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AdminLiveSessionComponent} from './admin-live-session/admin-live-session.component';
import {ManageLiveSessionsComponent} from './manage-live-sessions/manage-live-sessions.component';
import {UpdateLiveSessionComponent} from './update-live-session/update-live-session.component';
import {AuthGuard} from './guard/auth.guard';
import {AdminGuard} from './guard/admin.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'home', component: HomeComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'register-student', component: RegisterStudentComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'add-video', component: AddVideoComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'edit-video/:id', component: EditVideoComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'manage-videos', component: ManageVideosComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'student', component: StudentNavComponent,canActivate:[AuthGuard]},
  {path: 'student/recorded-session', component: StudentHomeComponent,canActivate:[AuthGuard]},
  {path: 'student/live-session', component: LiveSessionComponent,canActivate:[AuthGuard]},
  {path: 'admin/live-session', component: AdminLiveSessionComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'admin/manage-live-session', component: ManageLiveSessionsComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'admin/update-live-session/:id', component: UpdateLiveSessionComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'contact-us', component: ContactUsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
