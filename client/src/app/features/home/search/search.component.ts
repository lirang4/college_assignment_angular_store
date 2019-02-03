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

  selectedFilters: any;

  constructor(
    private router: Router,
    private filtersService: FiltersService) {
  }

  ngOnInit() {
    this.$filters = this.filtersService.Filters;
    this.$filtersKeys = this.filtersService.FiltersKeys;

    this.selectedFilters = this.filtersService.SelectedFilters;
  }

  onSearch(): void {
    this.router.navigate([`/results`]);
  }

  isSelected(key: string, filter: string): boolean {
    return this.selectedFilters[key] && this.selectedFilters[key].indexOf(filter) > -1;
  }

  onCheckboxChange(key: string, filter: string, event: MatCheckboxChange): void {
    if (event.checked) {
      this.filtersService.selectFilter(key, filter);
    } else {
      this.filtersService.removeFilter(key, filter);
    }
  }
}
