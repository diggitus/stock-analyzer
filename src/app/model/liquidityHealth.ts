export class LiquidityHealth {
    currentRatio: Array<number>;
    quickRatio: Array<number>;
    financialLeverage: Array<number>;
    debtEquity: Array<number>;

    constructor() {
        this.currentRatio = new Array<number>();
        this.quickRatio = new Array<number>();
        this.financialLeverage = new Array<number>();
        this.debtEquity = new Array<number>();
    }
}
