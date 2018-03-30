import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { BaseService } from 'app/services/base.service';
import { Observable } from 'rxjs/Observable';

/**
 * Valuation service.
 *
 * @see http://financials.morningstar.com/valuate/current-valuation-list.action?&t=XETR:ads&region=usa&culture=en-US
 * @see http://financials.morningstar.com/valuate/valuation-history.action?&t=XETR:ads&region="&G46&"&culture=en-US&cur=&type=price-earnings
 */
@Injectable()
export class ValuationService extends BaseService {

    private readonly type = 'valuate';
    private readonly valuationList = 'current-valuation-list.action';
    private readonly valuationHistory = 'valuation-history.action';

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
    getValuationList(searchRequest: SearchRequest): Observable<Valuation | null> {
        const url = `${this.baseUrl}/${this.type}/${this.valuationList}` +
            `?t=${searchRequest.stockExchange}:${searchRequest.symbol}` +
            `&region=${searchRequest.region}` +
            `&culture=${searchRequest.culture}`;

        return this.http.get(url, { headers: this.getRequestHeaders(BaseService.CONTENT_TYPE_HTML), responseType: 'text' })
            .map(resp => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(<string>resp, BaseService.CONTENT_TYPE_HTML);
                return this.parseValuationList(doc.body);
            })
            .catch(error => {
                console.error('Could not fetch valuation list');
                return Observable.of(null);
            });
    }

    /**
     * Parses valuation list.
     * @param elem The parent element which contains the valuation list table.
     */
    parseValuationList(elem: HTMLElement): Valuation {
        const valuation = new Valuation();
        const tableRows = elem.querySelectorAll('tbody tr th');

        valuation.priceEarnings = this.parseValuationListItem(tableRows, 'Price/Earnings', 1);
        valuation.priceBook = this.parseValuationListItem(tableRows, 'Price/Book', 1);
        valuation.priceSales = this.parseValuationListItem(tableRows, 'Price/Sales', 1);
        valuation.priceCashFlow = this.parseValuationListItem(tableRows, 'Price/Cash Flow', 1);
        valuation.dividendYield = this.parseValuationListItem(tableRows, 'Dividend Yield %', 1);

        valuation.priceEarnings5yAvg = this.parseValuationListItem(tableRows, 'Price/Earnings', 4);
        valuation.priceBook5yAvg = this.parseValuationListItem(tableRows, 'Price/Book', 4);
        valuation.priceSales5yAvg = this.parseValuationListItem(tableRows, 'Price/Sales', 4);
        valuation.priceCashFlow5yAvg = this.parseValuationListItem(tableRows, 'Price/Cash Flow', 4);
        valuation.dividendYield5yAvg = this.parseValuationListItem(tableRows, 'Dividend Yield %', 4);

        return valuation;
    }

    /**
     * Returns table row value or -1.
     * @param tableRows HTML table rows from HTTP response.
     * @param label The label in the table row.
     * @param col The column in the table row.
     */
    private parseValuationListItem(tableRows: NodeListOf<Element>, label: string, col: number): number {
        if (!tableRows) {
            return -1;
        }

        for (let i = 0; i < tableRows.length; i++) {
            const tableRow = tableRows[i];

            if (!tableRow.parentElement) {
                return -1;
            }

            const children = tableRow.parentElement.children;
            const elemLabel = tableRow.innerHTML;

            if (!children[col]) {
                return -1;
            }
            let symbolLabel = children[col].innerHTML;

            try {
                if (elemLabel === label) {
                    const idx = symbolLabel.indexOf(',');

                    if (idx >= 0) {
                        symbolLabel = symbolLabel.slice(0, idx) + symbolLabel.slice(idx + 1, symbolLabel.length);
                    }
                    return parseFloat(symbolLabel);
                }
            } catch (e) {
                return -1;
            }
        }
        return -1;
    }

    /**
     * Returns valuation history.
     * @param searchRequest The search request.
     */
    getvaluationHistory(searchRequest: SearchRequest): Observable<ValuationHistory | null> {
        const url = `${this.baseUrl}/${this.type}/${this.valuationHistory}` +
            `?t=${searchRequest.stockExchange}:${searchRequest.symbol}` +
            `&region=${searchRequest.region}` +
            `&culture=${searchRequest.culture}` +
            `&type=price-earnings`;

        return this.http.get(url, { headers: this.getRequestHeaders(BaseService.CONTENT_TYPE_HTML), responseType: 'text' })
            .map(resp => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(<string>resp, BaseService.CONTENT_TYPE_HTML);
                return this.parseValuationHistory(doc.body);
            })
            .catch(error => {
                console.error('Could not fetch valuation history');
                return Observable.of(null);
            });
    }

    /**
     * Parses valuation history.
     * @param elem The element which contains the valuation history.
     */
    parseValuationHistory(elem: HTMLElement): ValuationHistory {
        const valuationHistory = new ValuationHistory();
        const tableRows = elem.querySelectorAll('tbody tr');

        valuationHistory.priceEarnings = this.parseValuationHistoryItem(tableRows, 'Price/Earnings');
        valuationHistory.priceBook = this.parseValuationHistoryItem(tableRows, 'Price/Book');
        valuationHistory.priceSales = this.parseValuationHistoryItem(tableRows, 'Price/Sales');
        valuationHistory.priceCashFlow = this.parseValuationHistoryItem(tableRows, 'Price/Cash Flow');

        return valuationHistory;
    }

    /**
     * Returns table row value or an empty array.
     * @param tableRows HTML table rows from HTTP response.
     * @param label The lable in the table row.
     */
    private parseValuationHistoryItem(tableRows: NodeListOf<Element>, label: string): Array<number> {
        const result = new Array<number>();

        if (!tableRows) {
            return new Array<number>();
        }

        for (let i = 0; i < tableRows.length; i += 3) {
            const tableRow = tableRows[i];

            if (!tableRow.firstElementChild || !tableRow.nextElementSibling) {
                return new Array<number>();
            }

            const elemLabel = tableRow.firstElementChild.innerHTML;
            const siblingElem = tableRow.nextElementSibling;

            if (elemLabel !== label) {
                continue;
            }

            if (!siblingElem) {
                return new Array<number>();
            }
            const rowData = siblingElem.querySelectorAll('.row_data');

            for (let j = 0; j < rowData.length; j++) {
                const val = rowData[j];

                try {
                    let label = val.innerHTML;
                    const idx = label.indexOf(',');

                    if (idx >= 0) {
                        label = label.slice(0, idx) + label.slice(idx + 1, label.length);
                    }
                    result.push(parseFloat(label));
                } catch (e) {
                    console.error('Couldn\'t parse value');
                }
            }
        }
        return result;
    }

}
