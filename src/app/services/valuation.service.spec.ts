import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { ValuationService } from 'app/services/valuation.service';

// tslint:disable:no-non-null-assertion
describe('ValuationService', () => {

    let valuationService: ValuationService;
    let http: HttpTestingController;
    let resp: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ValuationService
            ]
        });
    });

    beforeEach(() => {
        valuationService = TestBed.get(ValuationService);
        http = TestBed.get(HttpTestingController);

        resp =
            `<table>
                <tbody>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Earnings</th>
                        <td align="right">29.7</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Book</th>
                        <td align="right">6.2</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Sales</th>
                        <td align="right">1.9</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Cash Flow</th>
                        <td align="right">24.4</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Dividend Yield %</th>
                        <td align="right">1.0</td>
                    </tr>
                </tbody>
            </table>`;
    });

    it('should parse and return valuation list', () => {
        const searchRequest = new SearchRequest();

        valuationService.getValuationList(searchRequest).subscribe((valuationResp: Valuation) => {
            expect(valuationResp.priceEarnings).toBe(29.7);
            expect(valuationResp.priceBook).toBe(6.2);
            expect(valuationResp.priceSales).toBe(1.9);
            expect(valuationResp.priceCashFlow).toBe(24.4);
            expect(valuationResp.dividendYield).toBe(1.0);
        });
        http.expectOne({ method: 'GET' });
    });

});
