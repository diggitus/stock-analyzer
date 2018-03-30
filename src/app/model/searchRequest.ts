/**
 * Search Request Class.
 */
export class SearchRequest {
    stockExchange: string;
    symbol: string;
    region: string;
    culture: string;

    constructor() {
        this.stockExchange = 'XETR';
        this.symbol = '';
        this.region = 'usa';
        this.culture = 'en-US';
    }
}
