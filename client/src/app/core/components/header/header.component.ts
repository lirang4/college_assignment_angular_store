import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: string;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.urlAfterRedirects.slice(1);
      }
    });
  }

  navigage(naviageTo: string): void {
    this.router.navigate([`/${naviageTo}`]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
