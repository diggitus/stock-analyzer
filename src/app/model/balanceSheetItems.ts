export class BalanceSheetItems {
    cashShortItemInvestments: Array<number>;
    accountsReceivable: Array<number>;
    inventory: Array<number>;
    otherCurrentAssets: Array<number>;
    totalCurrentAssets: Array<number>;
    netPPE: Array<number>;
    intangibles: Array<number>;
    otherLongTermAssets: Array<number>;
    totalAssets: Array<number>;
    accountsPayable: Array<number>;
    shortTermDebt: Array<number>;
    taxesPayable: Array<number>;
    accruedLiabilites: Array<number>;
    otherShortTermLiabilities: Array<number>;
    totalCurrentLiabilities: Array<number>;
    longTermDebt: Array<number>;
    otherLongTermLiabilities: Array<number>;
    totalLiabilities: Array<number>;
    totalStockholdersEquity: Array<number>;
    totalLiabilitiesEquity: Array<number>;

    constructor() {
        this.cashShortItemInvestments = new Array<number>();
        this.accountsReceivable = new Array<number>();
        this.inventory = new Array<number>();
        this.otherCurrentAssets = new Array<number>();
        this.totalCurrentAssets = new Array<number>();
        this.netPPE = new Array<number>();
        this.intangibles = new Array<number>();
        this.otherLongTermAssets = new Array<number>();
        this.totalAssets = new Array<number>();
        this.accountsPayable = new Array<number>();
        this.shortTermDebt = new Array<number>();
        this.taxesPayable = new Array<number>();
        this.accruedLiabilites = new Array<number>();
        this.otherShortTermLiabilities = new Array<number>();
        this.totalCurrentLiabilities = new Array<number>();
        this.longTermDebt = new Array<number>();
        this.otherLongTermLiabilities = new Array<number>();
        this.totalLiabilities = new Array<number>();
        this.totalStockholdersEquity = new Array<number>();
        this.totalLiabilitiesEquity = new Array<number>();
    }
}
