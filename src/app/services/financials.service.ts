import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/services/base.service';
import { Observable } from 'rxjs/Observable';

/**
 * Base service.
 */
@Injectable()
export class FinancialsService extends BaseService {

    private url1 = 'http://financials.morningstar.com/valuate/current-valuation-list.action?&t=XETR:ads&region=usa&culture=en-US';
    private url2 = 'http://financials.morningstar.com/valuate/valuation-history.action?&t="&F46&Bilanzauswertung!B4&"&region="&G46&"&culture=en-US&cur=&type=price-earnings';

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    get(): Observable<string> {
        return this.http.get(this.url1, { headers: this.getDefaultHeaders(), responseType: 'text' })
            .map(resp => {
                return <string>resp;
            })
            .catch(error => {
                return Observable.of('failed');
            });
    }

}
