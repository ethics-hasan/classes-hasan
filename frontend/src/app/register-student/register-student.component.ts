import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';

interface Streams {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})

export class RegisterStudentComponent implements OnInit {
  showValidationErrors: boolean
  selectedStreamValue: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  streams: Streams[] = [
    {value: 'arts', viewValue: 'Arts'},
    {value: 'commerce', viewValue: 'Commerce'},
    {value: 'science', viewValue: 'Science'}
  ];

  onSubmit(form: NgForm) {
    this.authService.signup(
      form.value.name,
      form.value.password,
      form.value.username,
      form.value.contact,
      form.value.email,
      form.value.standard,
      form.value.stream
    ).subscribe((res: HttpResponse<any>) => {
      this.router.navigate(['/home']);
    });
  }
}
