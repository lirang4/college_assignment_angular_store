import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: string;

  constructor(
    private router: Router) { }

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
}
