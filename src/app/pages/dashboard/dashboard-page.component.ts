import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FinancialsState, HeaderState, ValuationState } from 'app/app.state';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { FinancialsActions } from 'app/services/financials/financials.actions';
import { ValuationActions } from 'app/services/valuation/valuation.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/**
 * This class represents the dashboard page component.
 */
@Component({
    selector: 'app-dashboard-page',
    templateUrl: 'dashboard-page.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    @select() valuationState: Observable<ValuationState>;
    @select() financialsState: Observable<FinancialsState>;
    @select() headerState: Observable<HeaderState>;

    private valuationStateSubscription: Subscription;
    private financialsStateSubscription: Subscription;

    valuation: any;
    valuationHistory: any;

    /**
     * Constructor.
     */
    constructor(
        private valuationActions: ValuationActions,
        private financialsActions: FinancialsActions
    ) { }

    /**
     * OnInit handler.
     */
    ngOnInit() {
        this.valuationStateSubscription = this.valuationState.subscribe(state => {
            this.valuation = this.getValuationValues(state.valuation);
            this.valuationHistory = this.getValuationHistoryValues(state.valuationHistory);
        });

        this.financialsStateSubscription = this.financialsState.subscribe(state => {

        });
    }

    /**
     * OnDestroy handler.
     */
    ngOnDestroy() {
        if (this.valuationStateSubscription) {
            this.valuationStateSubscription.unsubscribe();
        }

        if (this.financialsStateSubscription) {
            this.financialsStateSubscription.unsubscribe();
        }
    }

    /**
     * Returns an object with current values of the stock.
     * @param valuation The valuation data.
     * @return object with valuation values.
     */
    private getValuationValues(valuation: Valuation): any {
        return [
            {
                de: 'KGV',
                en: 'price / earnings',
                value: valuation.priceEarnings
            },
            {
                de: 'KBV',
                en: 'price / book',
                value: valuation.priceBook
            },
            {
                de: 'KUV',
                en: 'price / sales',
                value: valuation.priceSales
            },
            {
                de: 'Dividendenrendite',
                en: 'dividend yield',
                value: valuation.dividendYield
            }
        ];
    }

    /**
     * Returns an object with valuation history values.
     * @param valuationHistory The valuation history values.
     * @return valuation history object for view.
     */
    private getValuationHistoryValues(valuationHistory: ValuationHistory): any {
        return [
            {
                de: 'KGV',
                en: 'price / earnings',
                value: this.calcAvg(valuationHistory.priceEarnings)
            },
            {
                de: 'KBV',
                en: 'price / book',
                value: this.calcAvg(valuationHistory.priceBook)
            },
            {
                de: 'KUV',
                en: 'price / sales',
                value: this.calcAvg(valuationHistory.priceSales)
            },
            {
                de: 'Cash Flow',
                en: 'price / cash flow',
                value: this.calcAvg(valuationHistory.priceCashFlow)
            }
        ];
    }

    /**
     * Calculates the average value of the given list item values.
     * @param valueList The item list.
     * @return average value.
     */
    private calcAvg(valueList: Array<number> | null): number | null {
        if (valueList) {
            const avgValue = valueList.reduce((prevValue: number, curValue: number) => prevValue + curValue) / valueList.length;
            return Math.round(avgValue * 100) / 100;
        }
        return null;
    }

}
