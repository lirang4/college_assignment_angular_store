import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FiltersService } from 'src/app/core/services/filters.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  $filters: any;
  $filtersKeys: any;

  constructor(
    private router: Router,
    private filtersService: FiltersService) {
  }

  ngOnInit() {
    this.$filters = this.filtersService.Filters;
    this.$filtersKeys = this.filtersService.FiltersKeys;
  }

  onSearch(): void {
    this.router.navigate([`/results`]);
  }

  onCheckboxChange(key: string, filter: string, event: MatCheckboxChange): void {
    if (event.checked) {
      this.filtersService.selectFilter(key, filter);
    } else {
      this.filtersService.removeFilter(key, filter);
    }
  }
}
