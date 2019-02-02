import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResultsResolver implements Resolve<Observable<any>> {

    constructor(private http: HttpClient) { }

    resolve() {
        return this.http.get(`/api/phones/filters`).pipe(delay(3000));
    }
}
