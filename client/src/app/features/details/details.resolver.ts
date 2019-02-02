import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DetailsResolver implements Resolve<Observable<any>> {

    constructor(private http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.http.get(`/api/phone/${route.params.id}`).pipe(delay(3000));
    }
}
