import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { MatTableModule } from '@angular/material/table';
import { StudentHomeComponent } from './student-home/student-home.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WebReqInterceptor} from './shared/web-req.interceptor';
import { AddVideoComponent } from './add-video/add-video.component';
import { ManageVideosComponent } from './manage-videos/manage-videos.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { LiveSessionComponent } from './live-session/live-session.component';
import { StudentNavComponent } from './student-nav/student-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLiveSessionComponent } from './admin-live-session/admin-live-session.component';
import { ManageLiveSessionsComponent } from './manage-live-sessions/manage-live-sessions.component';
import { UpdateLiveSessionComponent } from './update-live-session/update-live-session.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    AboutUsComponent,
    HomeComponent,
    RegisterStudentComponent,
    StudentHomeComponent,
    AddVideoComponent,
    ManageVideosComponent,
    EditVideoComponent,
    LiveSessionComponent,
    StudentNavComponent,
    NotFoundComponent,
    ProfileComponent,
    ContactUsComponent,
    AdminLiveSessionComponent,
    ManageLiveSessionsComponent,
    UpdateLiveSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
