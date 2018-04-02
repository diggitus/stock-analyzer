import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FinancialsState, HeaderState, ValuationState } from 'app/app.state';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { FinancialsActions } from 'app/services/financials/financials.actions';
import { ValuationActions } from 'app/services/valuation/valuation.actions';
import { Utils } from 'app/utils/utils';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const LAST_YEARS = 6;

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
    valuation5y: any;
    valuationHistory: any;

    finance: any;
    keyStat: any;

    /**
     * Constructor.
     */
    constructor(
        private valuationActions: ValuationActions,
        private financialsActions: FinancialsActions,
    ) { }

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
    private getFinanceValues(finance: Finance): any {
        return [
            {
                de: 'Wachstum Eigenkapital',
                en: 'equity growth',
                value: Utils.equityGrowth(finance.bookValuePerShare) + ' %'
            }
        ];
    }

    /**
     * Returns object with key stat values.
     * @param keyStat Contains key stat data.
     * @return object with key stat values.
     */
    private getKeyStatValues(keyStat: KeyStat): any {
        return [
            {
                de: 'Eigenkapitalquote',
                en: 'equity ratio',
                value: keyStat.balanceSheetItems ? Utils.equityRatio(keyStat.balanceSheetItems.totalStockholdersEquity) + ' %' : null
            },
            {
                de: 'Kapitalumschlag',
                en: 'asset turnover',
                value: keyStat.efficiency ? Utils.assetTurnover(keyStat.efficiency.assetTurnover) : null
            },
            {
                de: 'Liquiditätsgrad',
                en: 'current ratio',
                value: keyStat.liquidityHealth ? Utils.currentRatio(keyStat.liquidityHealth.currentRatio) : null
            },
            {
                de: 'Verschuldungsgrad',
                en: 'debt / equity',
                value: keyStat.liquidityHealth ? Utils.debtEquity(keyStat.liquidityHealth.debtEquity) : null
            },
            {
                de: 'Goodwill / Assets',
                en: 'intangibles',
                value: keyStat.balanceSheetItems ? Utils.intangibles(keyStat.balanceSheetItems.intangibles) : null
            },
            {
                de: 'Inventar',
                en: 'inventory',
                value: keyStat.balanceSheetItems ? Utils.inventory(keyStat.balanceSheetItems.inventory) : null
            }
        ];
    }

}
