import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  phone: any;
  stores: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.phone = this.route.snapshot.data.message.data;

    this.http.get('/api/stores').subscribe((res: { data: any }) => {
      this.stores = res.data;
    });
  }
}
