import { FinancialsState, ImmutableState, PayloadAction } from 'app/app.state';
import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { FinancialsActions } from 'app/services/financials/financials.actions';
import * as Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable<FinancialsState>({
    type: '',
    finance: new Finance(),
    keyStat: new KeyStat()
});

/**
 * Financials reducer.
 * @param state The financials state.
 * @param action The action type.
 */
export function FinancialsReducer(state: ImmutableState<FinancialsState> = INITIAL_STATE, action: PayloadAction): ImmutableState<FinancialsState> {
    switch (action.type) {

        case FinancialsActions.FINANCE_LOAD:
        case FinancialsActions.KEY_STAT_LOAD: {
            return financialsLoad(state, action);
        }

        case FinancialsActions.FINANCE_FAILED:
        case FinancialsActions.KEY_STAT_FAILED: {
            return financialsFailed(state, action);
        }

        case FinancialsActions.FINANCE_SUCCESS: {
            return financeSuccess(state, action);
        }

        case FinancialsActions.KEY_STAT_SUCCESS: {
            return keyStatSuccess(state, action);
        }

        default: {
            return state;
        }
    }
}

/**
 * Returns new state after finance was successfully loaded.
 * @param state The financials state.
 * @param action The payload action.
 */
function financeSuccess(state: ImmutableState<FinancialsState>, action: PayloadAction): ImmutableState<FinancialsState> {
    return state.merge({ type: action.type, finance: action.payload });
}

/**
 * Returns new state after key stat was successfully loaded.
 * @param state The financials state.
 * @param action The payload action.
 */
function keyStatSuccess(state: ImmutableState<FinancialsState>, action: PayloadAction): ImmutableState<FinancialsState> {
    return state.merge({ type: action.type, keyStat: action.payload });
}

/**
 * Financials load reducer.
 * @param state The financials state.
 * @param action The payload action.
 */
function financialsLoad(state: ImmutableState<FinancialsState>, action: PayloadAction): ImmutableState<FinancialsState> {
    return state.merge({ type: action.type });
}

/**
 * Financials failed reducer.
 * @param state The financials state.
 * @param action The payload action.
 */
function financialsFailed(state: ImmutableState<FinancialsState>, action: PayloadAction): ImmutableState<FinancialsState> {
    return state.merge({ type: action.type });
}

