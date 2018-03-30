import { Component } from '@angular/core';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { FinancialsActions } from 'app/services/financials/financials.actions';
import { StockService } from 'app/services/stock.service';
import { ValuationActions } from 'app/services/valuation/valuation.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    valuation: Valuation | null;
    valuationHistory: ValuationHistory | null;

    finance: Finance | null;
    keyStat: KeyStat | null;

    constructor(
        private valuationActions: ValuationActions,
        private financialsActions: FinancialsActions,
        private stockService: StockService
    ) {
        const searchRequest: SearchRequest = new SearchRequest();
        searchRequest.symbol = 'ads';

        this.valuationActions.getValuationList(searchRequest).subscribe(valuationResp => this.valuation = valuationResp);
        this.valuationActions.getValuationHistory(searchRequest).subscribe(valuationHistoryResp => this.valuationHistory = valuationHistoryResp);

        this.financialsActions.getFinance(searchRequest).subscribe((financeResp: Finance | null) => this.finance = financeResp);
        this.financialsActions.getKeyStat(searchRequest).subscribe((keyStatResp: KeyStat | null) => this.keyStat = keyStatResp);
    }
}
