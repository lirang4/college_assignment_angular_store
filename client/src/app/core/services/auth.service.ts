import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isLoggedIn = true;

  constructor(private router: Router) { }

  get IsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;

    this.navigateNext('/home');
  }

  private navigateNext(url: string): void {
    this.router.navigate([url]);
  }
}
