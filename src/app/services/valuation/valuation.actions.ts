import { NgRedux, select } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AppState, HeaderState } from 'app/app.state';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { ValuationService } from 'app/services/valuation/valuation.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/**
 * Valuation actions.
 */
@Injectable()
export class ValuationActions {

    static LIST_LOAD = 'LOAD_VALUATION_LIST';
    static LIST_SUCCESS = 'SUCCESS_VALUATION_LIST';
    static LIST_FAILED = 'FAILED_VALUATION_LIST';

    static HISTORY_LOAD = 'LOAD_VALUATION_HISTORY';
    static HISTORY_SUCCESS = 'SUCCESS_VALUATION_HISTORY';
    static HISTORY_FAILED = 'FAILED_VALUATION_HISTORY';

    @select() headerState: Observable<HeaderState>;

    private headerStateSubscription: Subscription;

    /**
     * Constructor.
     */
    constructor(
        private ngRedux: NgRedux<AppState>,
        private valuationService: ValuationService
    ) {
        this.headerStateSubscription = this.headerState.subscribe(state => {
            const req = state.searchRequest;

            if (req.symbol !== null) {
                this.updateValuationList(req);
                this.updateValuationHistory(req);
            }
        });
    }

    /**
     * Returns valuation list and stores it in redux store.
     * @param req The search request.
     */
    getValuationList(req: SearchRequest): Observable<Valuation | null> {
        this.ngRedux.dispatch({ type: ValuationActions.LIST_LOAD });

        return this.valuationService.getValuationList(req)
            .map(valuationList => {
                if (valuationList) {
                    this.ngRedux.dispatch({
                        type: ValuationActions.LIST_SUCCESS,
                        payload: valuationList
                    });
                    return valuationList;
                } else {
                    this.ngRedux.dispatch({ type: ValuationActions.LIST_FAILED });
                    return null;
                }
            });
    }

    /**
     * Updates valuation list in redux store.
     * @param req The search request.
     */
    updateValuationList(req: SearchRequest) {
        this.ngRedux.dispatch({ type: ValuationActions.LIST_LOAD });

        this.valuationService.getValuationList(req).subscribe(valuationList => {
            if (valuationList) {
                this.ngRedux.dispatch({
                    type: ValuationActions.LIST_SUCCESS,
                    payload: valuationList
                });
            } else {
                this.ngRedux.dispatch({ type: ValuationActions.LIST_FAILED });
            }
        });
    }

    /**
     * Returns valuation history and stores it in redux store.
     * @param req The search request.
     */
    getValuationHistory(req: SearchRequest): Observable<ValuationHistory | null> {
        this.ngRedux.dispatch({ type: ValuationActions.HISTORY_LOAD });

        return this.valuationService.getValuationHistory(req)
            .map(valuationHistory => {
                if (valuationHistory) {
                    this.ngRedux.dispatch({
                        type: ValuationActions.HISTORY_SUCCESS,
                        payload: valuationHistory
                    });
                    return valuationHistory;
                } else {
                    this.ngRedux.dispatch({ type: ValuationActions.HISTORY_FAILED });
                    return null;
                }
            });
    }

    /**
     * Updates valuation history in redux store.
     * @param req The search request.
     */
    updateValuationHistory(req: SearchRequest) {
        this.ngRedux.dispatch({ type: ValuationActions.HISTORY_LOAD });

        this.valuationService.getValuationHistory(req)
            .subscribe(valuationHistory => {
                if (valuationHistory) {
                    this.ngRedux.dispatch({
                        type: ValuationActions.HISTORY_SUCCESS,
                        payload: valuationHistory
                    });
                } else {
                    this.ngRedux.dispatch({ type: ValuationActions.HISTORY_FAILED });
                }
            });
    }
}
