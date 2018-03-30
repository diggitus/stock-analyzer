import { FinancialsReducer } from 'app/services/financials/financials.reducer';
import { ValuationReducer } from 'app/services/valuation/valuation.reducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers(<any>{
    valuationState: ValuationReducer,
    financialsState: FinancialsReducer
});

export const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};
