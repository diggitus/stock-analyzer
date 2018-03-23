export class Valuation {
    priceEarnings: number; // KGV
    priceBook: number; // KBV
    priceCashFlow: number;
    priceSales: number; // KUV
    dividendYield: number; // Dividendenrendite

    constructor() {
        this.priceEarnings = -1;
        this.priceBook = -1;
        this.priceCashFlow = -1;
        this.priceSales = -1;
        this.dividendYield = -1;
    }
}
