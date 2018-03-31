import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AppState } from 'app/app.state';
import { SearchRequest } from 'app/model/searchRequest';

/**
 * Header actions.
 */
@Injectable()
export class HeaderActions {

    static EXECUTE_SEARCH = 'EXECUTE_SEARCH';

    /**
     * Constructor.
     */
    constructor(
        private ngRedux: NgRedux<AppState>
    ) { }

    /**
     * Triggers search execution.
     * @param searchRequest The search request.
     */
    executeSearch(searchRequest: SearchRequest) {
        this.ngRedux.dispatch({
            type: HeaderActions.EXECUTE_SEARCH,
            payload: searchRequest
        });
    }
}
