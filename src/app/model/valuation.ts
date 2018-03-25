export class Valuation {
    priceEarnings: number; // KGV
    priceBook: number; // KBV
    priceCashFlow: number;
    priceSales: number; // KUV
    dividendYield: number; // Dividendenrendite

    priceEarnings5yAvg: number; // KGV
    priceBook5yAvg: number; // KBV
    priceCashFlow5yAvg: number;
    priceSales5yAvg: number; // KUV
    dividendYield5yAvg: number; // Dividendenrendite

    constructor() {
        this.priceEarnings = -1;
        this.priceBook = -1;
        this.priceCashFlow = -1;
        this.priceSales = -1;
        this.dividendYield = -1;

        this.priceEarnings5yAvg = -1;
        this.priceBook5yAvg = -1;
        this.priceCashFlow5yAvg = -1;
        this.priceSales5yAvg = -1;
        this.dividendYield5yAvg = -1;
    }
}
