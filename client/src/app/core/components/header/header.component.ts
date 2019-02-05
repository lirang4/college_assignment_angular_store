import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: string;
  users: number;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.urlAfterRedirects.slice(1);
      }
    });

    const socket = io('http://localhost:3001');
    socket.on('USERS', (res) => {
      this.users = res.users;
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
