import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FiltersService {
  $filters: any;
  $filtersKeys: any;

  selectedFilters: any;

  constructor(private http: HttpClient) {
    this.$filters = new BehaviorSubject<any>(undefined);
    this.$filtersKeys = new BehaviorSubject<any>(undefined);

    this.selectedFilters = {};

    this.http.get('/api/filters').subscribe(res => {
      this.$filters.next(res);
      this.$filtersKeys.next(Object.keys(res));
    });
  }

  get Filters(): any {
    return this.$filters;
  }

  get FiltersKeys(): any {
    return this.$filtersKeys;
  }

  get SelectedFilters(): any {
    return this.selectedFilters;
  }

  selectFilter(key: string, filter: string): void {
    if (this.selectedFilters[key]) {
      const index = this.selectedFilters[key].indexOf(filter);
      if (index === -1) {
        this.selectedFilters[key].push(filter);
      }
    } else {
      this.selectedFilters[key] = [filter];
    }
  }

  removeFilter(key: string, filter: string): void {
    if (!this.selectedFilters[key]) {
      return;
    }

    const index = this.selectedFilters[key].indexOf(filter);
    if (index > -1) {
      this.selectedFilters[key].splice(index, 1);

      if (this.selectedFilters[key].length === 0) {
        delete this.selectedFilters[key];
      }
    }
  }
}
