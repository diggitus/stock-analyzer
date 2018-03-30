/**
 * Valuation class.
 */
export class Valuation {
    priceEarnings: number | null; // KGV
    priceBook: number | null; // KBV
    priceCashFlow: number | null;
    priceSales: number | null; // KUV
    dividendYield: number | null; // Dividendenrendite

    priceEarnings5yAvg: number | null; // KGV
    priceBook5yAvg: number | null; // KBV
    priceCashFlow5yAvg: number | null;
    priceSales5yAvg: number | null; // KUV
    dividendYield5yAvg: number | null; // Dividendenrendite

    constructor() {
        this.priceEarnings = null;
        this.priceBook = null;
        this.priceCashFlow = null;
        this.priceSales = null;
        this.dividendYield = null;

        this.priceEarnings5yAvg = null;
        this.priceBook5yAvg = null;
        this.priceCashFlow5yAvg = null;
        this.priceSales5yAvg = null;
        this.dividendYield5yAvg = null;
    }
}
