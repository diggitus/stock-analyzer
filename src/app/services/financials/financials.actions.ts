import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AppState } from 'app/app.state';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { SearchRequest } from 'app/model/searchRequest';
import { FinancialsService } from 'app/services/financials/financials.service';
import { Observable } from 'rxjs/Observable';

/**
 * Financials actions.
 */
@Injectable()
export class FinancialsActions {

    static FINANCE_LOAD = 'LOAD_FINANCE';
    static FINANCE_SUCCESS = 'SUCCESS_FINANCE';
    static FINANCE_FAILED = 'FAILED_FINANCE';

    static KEY_STAT_LOAD = 'LOAD_KEY_STAT';
    static KEY_STAT_SUCCESS = 'SUCCESS_KEY_STAT';
    static KEY_STAT_FAILED = 'FAILED_KEY_STAT';

    /**
     * Constructor.
     */
    constructor(
        private ngRedux: NgRedux<AppState>,
        private financialsService: FinancialsService
    ) { }

    /**
     * Returns finance data and stores it in redux store.
     * @param req The search request.
     */
    getFinance(req: SearchRequest): Observable<Finance | null> {
        this.ngRedux.dispatch({ type: FinancialsActions.FINANCE_LOAD });

        return this.financialsService.getFinancePart(req)
            .map(finance => {
                if (finance) {
                    this.ngRedux.dispatch({
                        type: FinancialsActions.FINANCE_SUCCESS,
                        payload: finance
                    });
                    return finance;
                } else {
                    this.ngRedux.dispatch({ type: FinancialsActions.FINANCE_FAILED });
                    return null;
                }
            });
    }

    /**
     * Returns key stat data and stores it in redux store.
     * @param req The search request.
     */
    getKeyStat(req: SearchRequest): Observable<KeyStat | null> {
        this.ngRedux.dispatch({ type: FinancialsActions.KEY_STAT_LOAD });

        return this.financialsService.getKeyStatPart(req)
            .map(keyStat => {
                if (keyStat) {
                    this.ngRedux.dispatch({
                        type: FinancialsActions.KEY_STAT_SUCCESS,
                        payload: keyStat
                    });
                    return keyStat;
                } else {
                    this.ngRedux.dispatch({ type: FinancialsActions.KEY_STAT_FAILED });
                    return null;
                }
            });
    }
}
