/**
 * Finance class.
 * Be aware that the last item in the array is TTM!
 */
export class Finance {
    revenue: Array<number>; // in MIL
    grossMargin: Array<number>; // %
    operatingIncome: Array<number>; // MIL
    operatingMargin: Array<number>; // %
    netIncome: Array<number>; // MIL
    earningsPerShare: Array<number>;
    dividends: Array<number>;
    payoutRatio: Array<number>; // %
    shares: Array<number>; // MIL
    bookValuePerShare: Array<number>;
    operatingCashFlow: Array<number>; // MIL
    capSpending: Array<number>; // MIL
    freeCashFlow: Array<number>; // MIL
    freeCashFlowPerShare: Array<number>;
    workingCapital: Array<number>; // MIL

    constructor() {
        this.revenue = new Array<number>();
        this.grossMargin = new Array<number>();
        this.operatingIncome = new Array<number>();
        this.operatingMargin = new Array<number>();
        this.netIncome = new Array<number>();
        this.earningsPerShare = new Array<number>();
        this.dividends = new Array<number>();
        this.payoutRatio = new Array<number>();
        this.shares = new Array<number>();
        this.bookValuePerShare = new Array<number>();
        this.operatingCashFlow = new Array<number>();
        this.capSpending = new Array<number>();
        this.freeCashFlow = new Array<number>();
        this.freeCashFlowPerShare = new Array<number>();
        this.workingCapital = new Array<number>();
    }
}
