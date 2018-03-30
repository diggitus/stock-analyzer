/**
 * Balance Sheet Class.
 */
export class BalanceSheetItems {
    cashShortItemInvestments: Array<number> | null;
    accountsReceivable: Array<number> | null;
    inventory: Array<number> | null;
    otherCurrentAssets: Array<number> | null;
    totalCurrentAssets: Array<number> | null;
    netPPE: Array<number> | null;
    intangibles: Array<number> | null;
    otherLongTermAssets: Array<number> | null;
    totalAssets: Array<number> | null;
    accountsPayable: Array<number> | null;
    shortTermDebt: Array<number> | null;
    taxesPayable: Array<number> | null;
    accruedLiabilites: Array<number> | null;
    otherShortTermLiabilities: Array<number> | null;
    totalCurrentLiabilities: Array<number> | null;
    longTermDebt: Array<number> | null;
    otherLongTermLiabilities: Array<number> | null;
    totalLiabilities: Array<number> | null;
    totalStockholdersEquity: Array<number> | null;
    totalLiabilitiesEquity: Array<number> | null;

    /**
     * Constructor.
     */
    constructor() {
        this.cashShortItemInvestments = null;
        this.accountsReceivable = null;
        this.inventory = null;
        this.otherCurrentAssets = null;
        this.totalCurrentAssets = null;
        this.netPPE = null;
        this.intangibles = null;
        this.otherLongTermAssets = null;
        this.totalAssets = null;
        this.accountsPayable = null;
        this.shortTermDebt = null;
        this.taxesPayable = null;
        this.accruedLiabilites = null;
        this.otherShortTermLiabilities = null;
        this.totalCurrentLiabilities = null;
        this.longTermDebt = null;
        this.otherLongTermLiabilities = null;
        this.totalLiabilities = null;
        this.totalStockholdersEquity = null;
        this.totalLiabilitiesEquity = null;
    }
}
