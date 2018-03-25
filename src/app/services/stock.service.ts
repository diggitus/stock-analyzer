import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequest } from 'app/model/searchRequest';
import { Stock } from 'app/model/stock';
import { BaseService } from 'app/services/base.service';
import { Observable } from 'rxjs/Observable';

/**
 * Stock service.
 */
@Injectable()
export class StockService extends BaseService {

    /**
     * Constructor
     */
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    /**
     * Returns stock.
     * @param searchRequest The search request.
     */
    get(searchRequest: SearchRequest): Observable<Stock> {
        // TODO
        return Observable.of(new Stock());
    }

}
