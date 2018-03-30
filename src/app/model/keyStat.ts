import { BalanceSheetItems } from 'app/model/balanceSheetItems';
import { CashFlowRatios } from 'app/model/cashFlowRatios';
import { Efficiency } from 'app/model/efficiency';
import { LiquidityHealth } from 'app/model/liquidityHealth';

export class KeyStat {
    balanceSheetItems: BalanceSheetItems | null;
    cashFlowRatios: CashFlowRatios | null;
    efficiency: Efficiency | null;
    liquidityHealth: LiquidityHealth | null;

    constructor() {
        this.balanceSheetItems = null;
        this.cashFlowRatios = null;
        this.efficiency = null;
        this.liquidityHealth = null;
    }
}
