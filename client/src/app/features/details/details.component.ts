import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  phone: any;
  stores: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.phone = this.route.snapshot.data.message.data;

    this.http.get(`/api/availableStores/${this.phone._id}`).subscribe((res: { data: any }) => {
      this.stores = res.data[0];
      console.log(this.stores);
    });
  }

  isAdmin(): boolean {
    return this.authService.IsLoggedIn;
  }

  onUpdate(phone: any): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post(`/api/phone/${phone._id}`, JSON.stringify(phone), { headers: headers }).subscribe();
  }
}
