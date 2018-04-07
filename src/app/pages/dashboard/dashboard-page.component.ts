import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FinancialsState, HeaderState, ValuationState } from 'app/app.state';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { Rating } from 'app/model/rating';
import { Valuation } from 'app/model/valuation';
import { Value } from 'app/model/value';
import { FinancialsActions } from 'app/services/financials/financials.actions';
import { ValuationActions } from 'app/services/valuation/valuation.actions';
import { ValueStatus } from 'app/utils/enums';
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

    ratings: Array<Rating>;
    finance: Array<Value>;
    keyStat: Array<Value>;

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
            this.ratings = this.getRatings(state.valuation);
        });

        this.financialsStateSubscription = this.financialsState.subscribe(state => {
            this.finance = this.getFinanceValues(state.finance);
            this.keyStat = this.getKeyStatValues(state.keyStat);
        });
    }

    /**
     * Returns the classname for the status color.
     * @param val The value.
     * @return status color.
     */
    getStatusColor(val: Value): string {
        if (val.status === ValueStatus.GOOD) {
            return 'text-white bg-success';
        } else if (val.status === ValueStatus.BAD) {
            return 'text-white bg-danger';
        } else {
            return '';
        }
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
     * Returns ratings list.
     * @param valuation The valuation data.
     * @return ratings list.
     */
    private getRatings(valuation: Valuation): Array<Rating> {
        const resultList = new Array<Rating>();

        // KGV
        const priceEarnings = Utils.getValueRating(valuation.priceEarnings, valuation.priceEarnings5yAvg, 'KGV', 'price / earnings');
        if (priceEarnings) {
            resultList.push(priceEarnings);
        }

        // KBV
        const priceBook = Utils.getValueRating(valuation.priceBook, valuation.priceBook5yAvg, 'KBV', 'price / book');
        if (priceBook) {
            resultList.push(priceBook);
        }

        // KUV
        const priceSales = Utils.getValueRating(valuation.priceSales, valuation.priceBook5yAvg, 'KUV', 'price / sales');
        if (priceSales) {
            resultList.push(priceSales);
        }

        // Dividend Yield
        const dividendYield = Utils.getDividendRating(valuation.dividendYield, valuation.dividendYield5yAvg, 'Dividendenrendite', 'dividend yield');
        if (dividendYield) {
            resultList.push(dividendYield);
        }
        return resultList;
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
