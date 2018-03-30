/**
 * Finance class.
 * Be aware that the last item in the array is TTM!
 */
export class Finance {
    revenue: Array<number> | null; // in MIL
    grossMargin: Array<number> | null; // %
    operatingIncome: Array<number> | null; // MIL
    operatingMargin: Array<number> | null; // %
    netIncome: Array<number> | null; // MIL
    earningsPerShare: Array<number> | null;
    dividends: Array<number> | null;
    payoutRatio: Array<number> | null; // %
    shares: Array<number> | null; // MIL
    bookValuePerShare: Array<number> | null;
    operatingCashFlow: Array<number> | null; // MIL
    capSpending: Array<number> | null; // MIL
    freeCashFlow: Array<number> | null; // MIL
    freeCashFlowPerShare: Array<number> | null;
    workingCapital: Array<number> | null; // MIL

    /**
     * Constructor.
     */
    constructor() {
        this.revenue = null;
        this.grossMargin = null;
        this.operatingIncome = null;
        this.operatingMargin = null;
        this.netIncome = null;
        this.earningsPerShare = null;
        this.dividends = null;
        this.payoutRatio = null;
        this.shares = null;
        this.bookValuePerShare = null;
        this.operatingCashFlow = null;
        this.capSpending = null;
        this.freeCashFlow = null;
        this.freeCashFlowPerShare = null;
        this.workingCapital = null;
    }
}
