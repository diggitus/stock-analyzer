import { Valuation } from 'app/model/valuation';

/**
 * Stock class.
 */
export class Stock {
    symbol: string;
    stockExhange: string;
    quote: number;
    marketCap: number;

    valuation: Valuation;

    /**
     * Constructor.
     */
    constructor() {
        this.symbol = '';
        this.stockExhange = 'XETR';
        this.quote = -1;
        this.marketCap = -1;
        this.valuation = new Valuation();
    }
}
