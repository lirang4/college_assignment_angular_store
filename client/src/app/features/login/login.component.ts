import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.isLoading = false;
  }

  onSubmit(): void {
    this.isLoading = true;

    // TODO: Validate the info with the info on the server.
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate([`/admin`]);
    }, 3000);
  }
}
