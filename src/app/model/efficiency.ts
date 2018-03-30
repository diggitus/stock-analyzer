/**
 * Efficiency Class
 */
export class Efficiency {
    daysSalesOutstanding: Array<number> | null;
    daysInventory: Array<number> | null;
    payablesPeriod: Array<number> | null;
    cashConversionCycle: Array<number> | null;
    receivablesTurnover: Array<number> | null;
    inventoryTurnover: Array<number> | null;
    fixedAssetsTurnover: Array<number> | null;
    assetTurnover: Array<number> | null;

    /**
     * Constructor.
     */
    constructor() {
        this.daysSalesOutstanding = null;
        this.daysInventory = null;
        this.payablesPeriod = null;
        this.cashConversionCycle = null;
        this.receivablesTurnover = null;
        this.inventoryTurnover = null;
        this.fixedAssetsTurnover = null;
        this.assetTurnover = null;
    }
}
