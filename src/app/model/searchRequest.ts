/**
 * Search Request Class.
 */
export class SearchRequest {
    stockExchange: string;
    symbol: string | null;
    region: string;
    culture: string;

    constructor(query?: string) {
        this.stockExchange = 'XETR';
        this.symbol = query ? query : null;
        this.region = 'usa';
        this.culture = 'en-US';
    }
}
