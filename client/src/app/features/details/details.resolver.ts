import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DetailsResolver implements Resolve<Observable<string>> {
    constructor() { }

    resolve() {
        const resolverData = 'data';

        return of(resolverData).pipe(
            delay(3000)
        );
    }
}
