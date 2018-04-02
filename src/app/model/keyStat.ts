import { BalanceSheetItems } from 'app/model/balanceSheetItems';
import { CashFlowRatios } from 'app/model/cashFlowRatios';
import { Efficiency } from 'app/model/efficiency';
import { LiquidityHealth } from 'app/model/liquidityHealth';
import { Profitability } from 'app/model/profitability';

/**
 * Key Stat Class.
 */
export class KeyStat {
    profitability: Profitability | null;
    balanceSheetItems: BalanceSheetItems | null;
    cashFlowRatios: CashFlowRatios | null;
    efficiency: Efficiency | null;
    liquidityHealth: LiquidityHealth | null;

    constructor() {
        this.profitability = null;
        this.balanceSheetItems = null;
        this.cashFlowRatios = null;
        this.efficiency = null;
        this.liquidityHealth = null;
    }
}
