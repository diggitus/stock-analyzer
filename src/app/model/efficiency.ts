export class Efficiency {
    daysSalesOutstanding: Array<number>;
    daysInventory: Array<number>;
    payablesPeriod: Array<number>;
    cashConversionCycle: Array<number>;
    receivablesTurnover: Array<number>;
    inventoryTurnover: Array<number>;
    fixedAssetsTurnover: Array<number>;
    assetTurnover: Array<number>;

    constructor() {
        this.daysSalesOutstanding = new Array<number>();
        this.daysInventory = new Array<number>();
        this.payablesPeriod = new Array<number>();
        this.cashConversionCycle = new Array<number>();
        this.receivablesTurnover = new Array<number>();
        this.inventoryTurnover = new Array<number>();
        this.fixedAssetsTurnover = new Array<number>();
        this.assetTurnover = new Array<number>();
    }
}
