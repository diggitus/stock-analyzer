import { Finance } from 'app/model/finance';
import { KeyStat } from 'app/model/keyStat';
import { Valuation } from 'app/model/valuation';
import { ValuationHistory } from 'app/model/valuationHistory';
import { Action } from 'redux';
import { ImmutableObject } from 'seamless-immutable';

export type ImmutableState<T> = ImmutableObject<T> & T;

export interface PayloadAction extends Action {
    payload?: any;
}

export interface AppState {
    valuationState: ValuationState;
    financialsState: FinancialsState;
}

export interface ValuationState {
    type: string;
    valuation: Valuation;
    valuationHistory: ValuationHistory;
}

export interface FinancialsState {
    type: string;
    finance: Finance;
    keyStat: KeyStat;
}
