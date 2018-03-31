import { HeaderState, ImmutableState, PayloadAction } from 'app/app.state';
import { HeaderActions } from 'app/core/header/header.actions';
import { SearchRequest } from 'app/model/searchRequest';
import * as Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable<HeaderState>({
    type: '',
    searchRequest: new SearchRequest()
});

/**
 * Header reducer.
 * @param state The header state.
 * @param action The action type.
 */
export function HeaderReducer(state: ImmutableState<HeaderState> = INITIAL_STATE, action: PayloadAction): ImmutableState<HeaderState> {
    switch (action.type) {

        case HeaderActions.EXECUTE_SEARCH: {
            return executeSearch(state, action);
        }

        default: {
            return state;
        }
    }
}

/**
 * Returns new state after search was successfully executed.
 * @param state The header state.
 * @param action The payload action.
 */
function executeSearch(state: ImmutableState<HeaderState>, action: PayloadAction): ImmutableState<HeaderState> {
    return state.merge({ type: action.type, searchRequest: action.payload });
}



