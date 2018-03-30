import { Component } from '@angular/core';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { FinancialsService } from 'app/services/financials.service';
import { StockService } from 'app/services/stock.service';
import { ValuationService } from 'app/services/valuation.service';

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
        private valuationService: ValuationService,
        private financialsService: FinancialsService,
        private stockService: StockService
    ) {
        const searchRequest: SearchRequest = new SearchRequest();
        searchRequest.symbol = 'ads';

        this.valuationService.getValuationList(searchRequest).subscribe(valuationResp => this.valuation = valuationResp);
        this.valuationService.getvaluationHistory(searchRequest).subscribe(valuationHistoryResp => this.valuationHistory = valuationHistoryResp);

        this.financialsService.getFinancePart(searchRequest).subscribe((financeResp: Finance | null) => this.finance = financeResp);
        this.financialsService.getKeyStatPart(searchRequest).subscribe((keyStatResp: KeyStat | null) => this.keyStat = keyStatResp);
    }
}
