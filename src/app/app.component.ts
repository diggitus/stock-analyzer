import { Component } from '@angular/core';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { ValuationService } from 'app/services/valuation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    valuation: Valuation;

    constructor(private valuationService: ValuationService) {
        const searchRequest: SearchRequest = new SearchRequest();
        searchRequest.symbol = 'ads';
        this.valuationService.getValuationList(searchRequest).subscribe(valuationResp => this.valuation = valuationResp);
    }
}
