import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export class Filters {
  brand: Array<string>;
  colors: Array<string>;
  generation: Array<string>;
  memory_capacity: Array<string>;
  ram: Array<string>;
  screen_size: Array<string>;
  screen_type: Array<string>;

  fromJSON(json: any) {
    for (const propName of json) {
      this[propName] = json[propName];
    }

    return this;
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  data: Filters;
  keys: Array<string>;

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('/api/filters').subscribe(res => {
      this.data = new Filters().fromJSON(res);
      this.keys = Object.keys(this.data);
    });
  }

  onSearch(): void {
    this.router.navigate([`/results`]);
  }
}
