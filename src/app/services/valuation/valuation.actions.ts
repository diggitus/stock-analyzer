import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AppState } from 'app/app.state';
import { SearchRequest } from 'app/model/searchRequest';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { ValuationService } from 'app/services/valuation/valuation.service';
import { Observable } from 'rxjs/Observable';

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

    /**
     * Constructor.
     */
    constructor(
        private ngRedux: NgRedux<AppState>,
        private valuationService: ValuationService
    ) { }

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
}
