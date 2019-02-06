import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.results = this.route.snapshot.data.message.data;
  }

  navigateToDetails(id: string): void {
    this.router.navigate([`/details/${id}`]);
  }

  isAdmin(): boolean {
    return this.authService.IsLoggedIn;
  }

  onDelete(result: any): void {
    const index = this.results.findIndex(phone => phone._id === result._id);

    if (index > -1) {
      this.results.splice(index, 1);
      this.http.delete(`/api/phone/${result._id}`).subscribe();
    }
  }
}
