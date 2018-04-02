/**
 * Profitability class.
 */
export class Profitability {
    taxRate: Array<number> | null;
    netMargin: Array<number> | null;
    assetTurnover: Array<number> | null;
    returnOnAssets: Array<number> | null;
    financialLeverage: Array<number> | null;
    returnOnEquity: Array<number> | null;
    returnOnInvestedCapital: Array<number> | null;
    interestCoverage: Array<number> | null;

    /**
     * Constructor.
     */
    constructor() {
        this.taxRate = null;
        this.netMargin = null;
        this.assetTurnover = null;
        this.returnOnAssets = null;
        this.financialLeverage = null;
        this.returnOnEquity = null;
        this.returnOnInvestedCapital = null;
        this.interestCoverage = null;
    }

}
