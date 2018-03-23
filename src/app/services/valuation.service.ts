import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { BaseService } from 'app/services/base.service';
import { Observable } from 'rxjs/Observable';

/**
 * Valuation service.
 */
@Injectable()
export class ValuationService extends BaseService {

    private valuationList = 'current-valuation-list.action';
    private valuationHistory = 'valuation-history.action';

    private url1 = 'http://financials.morningstar.com/valuate/current-valuation-list.action?&t=XETR:ads&region=usa&culture=en-US';
    private url2 = 'http://financials.morningstar.com/valuate/valuation-history.action?&t=XETR:ads&region="&G46&"&culture=en-US&cur=&type=price-earnings';

    /**
     * Constructor
     */
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    /**
     * Returns valuation list.
     * @param searchRequest The search request.
     */
    getValuationList(searchRequest: SearchRequest): Observable<Valuation> {
        const url = `${this.baseUrl}/${this.valuationList}?` +
            `&t=${searchRequest.stockExchange}:${searchRequest.symbol}` +
            `&region=${searchRequest.region}` +
            `&culture=${searchRequest.culture}`;

        return this.http.get(url, { headers: this.getDefaultHeaders(), responseType: 'text' })
            .map(resp => {
                return this.parseValuation(<string>resp);
            })
            .catch(error => {
                return Observable.of(new Valuation());
            });
    }

    /**
     * Parses valuation list.
     * @param resp The get response.
     */
    private parseValuation(resp: string) {
        const valuation = new Valuation();
        const parser = new DOMParser();
        const doc = parser.parseFromString(resp, 'text/html');
        const tableRows = doc.querySelectorAll('tbody tr th');

        valuation.priceEarnings = this.getValue(tableRows, 'Price/Earnings');
        valuation.priceBook = this.getValue(tableRows, 'Price/Book');
        valuation.priceSales = this.getValue(tableRows, 'Price/Sales');
        valuation.priceCashFlow = this.getValue(tableRows, 'Price/Cash Flow');
        valuation.dividendYield = this.getValue(tableRows, 'Dividend Yield %');

        return valuation;
    }

    /**
     * Returns table row value or -1.
     * @param tableRows HTML table rows from HTTP response.
     * @param label The label in the table row.
     */
    private getValue(tableRows: NodeListOf<Element>, label: string): number {
        if (!tableRows) {
            return -1;
        }

        for (let i = 0; i < tableRows.length; i++) {
            const tableRow = tableRows[i];

            if (!tableRow.nextElementSibling) {
                return -1;
            }
            const elemLabel = tableRow.innerHTML;
            const siblingLabel = tableRow.nextElementSibling.innerHTML;

            try {
                if (elemLabel === label) {
                    return parseFloat(siblingLabel);
                }
            } catch (e) {
                return -1;
            }
        }
        return -1;
    }

}
