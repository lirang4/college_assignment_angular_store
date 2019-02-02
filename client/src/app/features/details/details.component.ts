import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  phone: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.phone = this.route.snapshot.data.message.data;
  }
}
