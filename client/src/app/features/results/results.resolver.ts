import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { FiltersService } from 'src/app/core/services/filters.service';

@Injectable()
export class ResultsResolver implements Resolve<Observable<any>> {

    constructor(
        private http: HttpClient,
        private filtersService: FiltersService) { }

    resolve() {
        return this.http.post(`/api/phones/filters`, this.filtersService.SelectedFilters).pipe(delay(3000));
    }
}
