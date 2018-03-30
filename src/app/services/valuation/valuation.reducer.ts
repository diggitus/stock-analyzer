import { ImmutableState, PayloadAction, ValuationState } from 'app/app.state';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { ValuationActions } from 'app/services/valuation/valuation.actions';
import * as Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable<ValuationState>({
    type: '',
    valuation: new Valuation(),
    valuationHistory: new ValuationHistory()
});

/**
 * Valuation reducer.
 * @param state The valuation state.
 * @param action The action type.
 */
export function ValuationReducer(state: ImmutableState<ValuationState> = INITIAL_STATE, action: PayloadAction): ImmutableState<ValuationState> {
    switch (action.type) {

        case ValuationActions.LIST_LOAD:
        case ValuationActions.HISTORY_LOAD: {
            return valuationLoad(state, action);
        }

        case ValuationActions.LIST_FAILED:
        case ValuationActions.HISTORY_FAILED: {
            return valuationFailed(state, action);
        }

        case ValuationActions.LIST_SUCCESS: {
            return valuationListSuccess(state, action);
        }

        case ValuationActions.HISTORY_SUCCESS: {
            return valuationHistorySuccess(state, action);
        }

        default: {
            return state;
        }
    }
}

/**
 * Returns new state after valuation list was successfully loaded.
 * @param state The valuation state.
 * @param action The payload action.
 */
function valuationListSuccess(state: ImmutableState<ValuationState>, action: PayloadAction): ImmutableState<ValuationState> {
    return state.merge({ type: action.type, valuation: action.payload });
}

/**
 * Returns new state after valuation history was successfully loaded.
 * @param state The valuation state.
 * @param action The payload action.
 */
function valuationHistorySuccess(state: ImmutableState<ValuationState>, action: PayloadAction): ImmutableState<ValuationState> {
    return state.merge({ type: action.type, valuationHistory: action.payload });
}

/**
 * Valuation load reducer.
 * @param state The valuation state.
 * @param action The payload action.
 */
function valuationLoad(state: ImmutableState<ValuationState>, action: PayloadAction): ImmutableState<ValuationState> {
    return state.merge({ type: action.type });
}

/**
 * Valuation failed reducer.
 * @param state The valuation state.
 * @param action The payload action.
 */
function valuationFailed(state: ImmutableState<ValuationState>, action: PayloadAction): ImmutableState<ValuationState> {
    return state.merge({ type: action.type });
}

