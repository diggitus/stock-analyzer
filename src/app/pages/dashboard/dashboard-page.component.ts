import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FinancialsState, HeaderState, ValuationState } from 'app/app.state';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { Value } from 'app/model/value';
import { FinancialsActions } from 'app/services/financials/financials.actions';
import { ValuationActions } from 'app/services/valuation/valuation.actions';
import { Constants } from 'app/utils/constants';
import { Utils } from 'app/utils/utils';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const LAST_YEARS = 6;

/**
 * This class represents the dashboard page component.
 */
@Component({
    selector: 'app-dashboard-page',
    templateUrl: 'dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    @select() valuationState: Observable<ValuationState>;
    @select() financialsState: Observable<FinancialsState>;
    @select() headerState: Observable<HeaderState>;

    private valuationStateSubscription: Subscription;
    private financialsStateSubscription: Subscription;

    valuation: any;
    valuation5y: any;
    valuationHistory: any;

    finance: any;
    keyStat: any;

    typePerc: number;

    /**
     * Constructor.
     */
    constructor(
        private valuationActions: ValuationActions,
        private financialsActions: FinancialsActions,
    ) {
        this.typePerc = Constants.TYPE_PERC;
    }

    /**
     * OnInit handler.
     */
    ngOnInit() {
        this.valuationStateSubscription = this.valuationState.subscribe(state => {
            this.valuation = this.getValuationValues(state.valuation);
            this.valuation5y = this.getValuation5yValues(state.valuation);
            this.valuationHistory = this.getValuationHistoryValues(state.valuationHistory);
        });

        this.financialsStateSubscription = this.financialsState.subscribe(state => {
            this.finance = this.getFinanceValues(state.finance);
            this.keyStat = this.getKeyStatValues(state.keyStat);
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
                value: valuation.dividendYield + ' %'
            }
        ];
    }

    /**
     * Returns an object with valuation data of last 5-years.
     * @param valuation The valuation data.
     * @return object with valuation values.
     */
    private getValuation5yValues(valuation: Valuation): any {
        return [
            {
                de: 'KGV',
                en: 'price / earnings',
                value: valuation.priceEarnings5yAvg
            },
            {
                de: 'KBV',
                en: 'price / book',
                value: valuation.priceBook5yAvg
            },
            {
                de: 'KUV',
                en: 'price / sales',
                value: valuation.priceSales5yAvg
            },
            {
                de: 'Dividendenrendite',
                en: 'dividend yield',
                value: valuation.dividendYield5yAvg + ' %'
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
                de: 'KGV (6-Jahre)',
                en: 'price / earnings',
                value: Utils.calcAvg(Utils.sublist(valuationHistory.priceEarnings, LAST_YEARS))
            },
            {
                de: 'KBV (6-Jahre)',
                en: 'price / book',
                value: Utils.calcAvg(Utils.sublist(valuationHistory.priceBook, LAST_YEARS))
            },
            {
                de: 'KUV (6-Jahre)',
                en: 'price / sales',
                value: Utils.calcAvg(Utils.sublist(valuationHistory.priceSales, LAST_YEARS))
            },
            {
                de: 'Cash Flow (6-Jahre)',
                en: 'price / cash flow',
                value: Utils.calcAvg(Utils.sublist(valuationHistory.priceCashFlow, LAST_YEARS))
            }
        ];
    }

    /**
     * Returns object with finance values.
     * @param finance Contains finance data.
     * @return object with finance values.
     */
    private getFinanceValues(finance: Finance): Array<Value> {
        return new Array<Value>(Utils.equityGrowth(finance.bookValuePerShare));
    }

    /**
     * Returns object with key stat values.
     * @param keyStat Contains key stat data.
     * @return object with key stat values.
     */
    private getKeyStatValues(keyStat: KeyStat): Array<Value> {
        const result = new Array<Value>();

        if (keyStat.balanceSheetItems) {
            result.push(Utils.equityRatio(keyStat.balanceSheetItems.totalStockholdersEquity));
            result.push(Utils.intangibles(keyStat.balanceSheetItems.intangibles));
            result.push(Utils.inventory(keyStat.balanceSheetItems.inventory));
        }

        if (keyStat.efficiency) {
            result.push(Utils.assetTurnover(keyStat.efficiency.assetTurnover));
        }

        if (keyStat.liquidityHealth) {
            result.push(Utils.currentRatio(keyStat.liquidityHealth.currentRatio));
            result.push(Utils.debtEquity(keyStat.liquidityHealth.debtEquity));
        }

        if (keyStat.profitability) {
            result.push(Utils.returnOnEquity(keyStat.profitability.returnOnEquity));
            result.push(Utils.returnOnAssets(keyStat.profitability.returnOnAssets));
            result.push(Utils.returnOnCapitalEmployed(keyStat.profitability.returnOnInvestedCapital));
        }
        return result;
    }

}
