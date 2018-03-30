/**
 * Cash Flow Ratios Class
 */
export class CashFlowRatios {
    operatingCashFlowGrowth: Array<number> | null;
    freeCashFlowGrowth: Array<number> | null;
    capExAOfSales: Array<number> | null;
    freeCashFlowSales: Array<number> | null;
    freeCashFlowNetIncome: Array<number> | null;

    /**
     * Constructor.
     */
    constructor() {
        this.operatingCashFlowGrowth = null;
        this.freeCashFlowGrowth = null;
        this.capExAOfSales = null;
        this.freeCashFlowSales = null;
        this.freeCashFlowNetIncome = null;
    }
}
