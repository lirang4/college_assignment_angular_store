import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;
  isAuthorized: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.isLoading = false;
  }

  onSubmit(): void {
    this.isLoading = true;

    this.http.post('/api/authentication', this.loginForm.value)
      .pipe(delay(3000))
      .subscribe((res: { authorized: boolean }) => {
        this.isLoading = false;
        this.isAuthorized = false;

        if (res.authorized) {
          this.isAuthorized = true;
          this.authService.login();
          this.router.navigate([`/admin`]);
        }
      }, (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.isAuthorized = false;
      });
  }
}
