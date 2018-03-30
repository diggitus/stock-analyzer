import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ValuationService } from 'app/services/valuation/valuation.service';

// tslint:disable:no-non-null-assertion
describe('ValuationService', () => {

    let valuationService: ValuationService;
    let http: HttpTestingController;
    let valuationList: string;
    let valuationHistoryList: string;

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

        valuationList =
            `<table>
                <tbody>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Earnings</th>
                        <td align="right">29.7</td>
                        <td align="right"></td>
                        <td align="right"></td>
                        <td align="right">1</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Book</th>
                        <td align="right">6.2</td>
                        <td align="right"></td>
                        <td align="right"></td>
                        <td align="right">2</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Sales</th>
                        <td align="right">1.9</td>
                        <td align="right"></td>
                        <td align="right"></td>
                        <td align="right">3</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Price/Cash Flow</th>
                        <td align="right">24.4</td>
                        <td align="right"></td>
                        <td align="right"></td>
                        <td align="right">4</td>
                    </tr>
                    <tr>
                        <th scope="row" class="row_lbl">Dividend Yield %</th>
                        <td align="right">1.0</td>
                        <td align="right"></td>
                        <td align="right"></td>
                        <td align="right">5</td>
                    </tr>
                </tbody>
            </table>`;

        valuationHistoryList =
            `<table>
                <tbody>
                    <tr>
                        <th scope="row">Price/Earnings</th>
                    </tr>
                    <tr>
                        <td class="row_data">1</td>
                        <td class="row_data">2</td>
                        <td class="row_data">3</td>
                        <td class="row_data">4</td>
                    </tr>
                </tbody>
            </table>`;
    });

    it('should parse and return valuation list', () => {
        const html = document.createElement('html');
        html.innerHTML = valuationList;

        const valuationResp = valuationService.parseValuationList(html);
        expect(valuationResp).not.toBeNull();

        if (valuationResp) {
            expect(valuationResp.priceEarnings).toBe(29.7);
            expect(valuationResp.priceBook).toBe(6.2);
            expect(valuationResp.priceSales).toBe(1.9);
            expect(valuationResp.priceCashFlow).toBe(24.4);
            expect(valuationResp.dividendYield).toBe(1.0);

            expect(valuationResp.priceEarnings5yAvg).toBe(1);
            expect(valuationResp.priceBook5yAvg).toBe(2);
            expect(valuationResp.priceSales5yAvg).toBe(3);
            expect(valuationResp.priceCashFlow5yAvg).toBe(4);
            expect(valuationResp.dividendYield5yAvg).toBe(5);
        }
    });

    it('should parse and return valuation history', () => {
        const html = document.createElement('html');
        html.innerHTML = valuationHistoryList;

        const valuationResp = valuationService.parseValuationHistory(html);
        expect(valuationResp).not.toBeNull();

        if (valuationResp && valuationResp.priceEarnings) {
            expect(valuationResp.priceEarnings[0]).toBe(1);
            expect(valuationResp.priceEarnings[1]).toBe(2);
            expect(valuationResp.priceEarnings[2]).toBe(3);
            expect(valuationResp.priceEarnings[3]).toBe(4);
        }
    });

});
