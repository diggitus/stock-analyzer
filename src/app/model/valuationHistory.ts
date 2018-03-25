export class ValuationHistory {
    priceEarnings: Array<number>; // KGV
    priceBook: Array<number>; // KBV
    priceSales: Array<number>; // KUV
    priceCashFlow: Array<number>;

    constructor() {
        this.priceEarnings = [];
        this.priceBook = [];
        this.priceCashFlow = [];
        this.priceSales = [];
    }

}
