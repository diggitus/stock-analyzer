/**
 * Valuation history class.
 */
export class ValuationHistory {
    priceEarnings: Array<number> | null; // KGV
    priceBook: Array<number> | null; // KBV
    priceSales: Array<number> | null; // KUV
    priceCashFlow: Array<number> | null;

    /**
     * Constructor.
     */
    constructor() {
        this.priceEarnings = null;
        this.priceBook = null;
        this.priceCashFlow = null;
        this.priceSales = null;
    }

}
