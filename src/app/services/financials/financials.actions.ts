import { NgRedux, select } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AppState, HeaderState } from 'app/app.state';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { SearchRequest } from 'app/model/searchRequest';
import { FinancialsService } from 'app/services/financials/financials.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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

    @select() headerState: Observable<HeaderState>;

    private headerStateSubscription: Subscription;

    /**
     * Constructor.
     */
    constructor(
        private ngRedux: NgRedux<AppState>,
        private financialsService: FinancialsService
    ) {
        this.headerStateSubscription = this.headerState.subscribe(state => {
            const req = state.searchRequest;

            if (req.symbol !== null) {
                this.updateFinance(req);
                this.updateKeyStat(req);
            }
        });
    }

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
     * Updates finance data in redux store.
     * @param req The search request.
     */
    updateFinance(req: SearchRequest) {
        this.ngRedux.dispatch({ type: FinancialsActions.FINANCE_LOAD });

        return this.financialsService.getFinancePart(req)
            .subscribe(finance => {
                if (finance) {
                    this.ngRedux.dispatch({
                        type: FinancialsActions.FINANCE_SUCCESS,
                        payload: finance
                    });
                } else {
                    this.ngRedux.dispatch({ type: FinancialsActions.FINANCE_FAILED });
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

    /**
     * Updates key stat data in redux store.
     * @param req The search request.
     */
    updateKeyStat(req: SearchRequest) {
        this.ngRedux.dispatch({ type: FinancialsActions.KEY_STAT_LOAD });

        return this.financialsService.getKeyStatPart(req)
            .subscribe(keyStat => {
                if (keyStat) {
                    this.ngRedux.dispatch({
                        type: FinancialsActions.KEY_STAT_SUCCESS,
                        payload: keyStat
                    });
                } else {
                    this.ngRedux.dispatch({ type: FinancialsActions.KEY_STAT_FAILED });
                }
            });
    }
}
