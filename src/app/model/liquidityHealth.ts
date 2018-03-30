/**
 * Liquidity Health Class.
 */
export class LiquidityHealth {
    currentRatio: Array<number> | null;
    quickRatio: Array<number> | null;
    financialLeverage: Array<number> | null;
    debtEquity: Array<number> | null;

    /**
     * Constructor.
     */
    constructor() {
        this.currentRatio = null;
        this.quickRatio = null;
        this.financialLeverage = null;
        this.debtEquity = null;
    }
}
