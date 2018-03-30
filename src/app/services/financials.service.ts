import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceSheetItems } from 'app/model/balanceSheetItems';
import { CashFlowRatios } from 'app/model/cashFlowRatios';
import { Efficiency } from 'app/model/efficiency';
import { Finance } from 'app/model/finance';
import { FinancialsApiResponse } from 'app/model/financialsApiResponse';
import { KeyStat } from 'app/model/keyStat';
import { LiquidityHealth } from 'app/model/liquidityHealth';
import { SearchRequest } from 'app/model/searchRequest';
import { BaseService } from 'app/services/base.service';
import { Observable } from 'rxjs/Observable';

/**
 * Financials service.
 */
@Injectable()
export class FinancialsService extends BaseService {

    private readonly CASH_FLOW_RATIOS = 2;
    private readonly BALANCE_SHEET_ITEMS = 3;
    private readonly LIQUIDITY_HEALTH = 3;
    private readonly EFFICIENCY = 4;

    private readonly type = 'financials';
    private readonly financePart = 'getFinancePart';
    private readonly keyStatPart = 'getKeyStatPart';

    private url1 = 'http://financials.morningstar.com/financials/getFinancePart.html?t=XETR:ADS&region=usa&culture=en-US';
    private url2 = 'http://financials.morningstar.com/financials/getKeyStatPart.html?t=XETR:ADS&region=usa&culture=en-US';

    /**
     * Constructor
     */
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getFinancePart(searchRequest: SearchRequest): Observable<Finance | null> {
        const url = `${this.baseUrl}/${this.type}/${this.financePart}.html?` +
            `t=${searchRequest.stockExchange}:${searchRequest.symbol}` +
            `&region=${searchRequest.region}` +
            `&culture=${searchRequest.culture}`;

        return this.http.get(url)
            .map(resp => {
                return this.parseFinancePart(<FinancialsApiResponse>resp);
            })
            .catch(error => {
                return Observable.of(null);
            });
    }

    private parseFinancePart(resp: FinancialsApiResponse): Finance {
        const finance = new Finance();
        const parser = new DOMParser();
        const doc = parser.parseFromString(resp.componentData, 'text/html');
        const tableRows = doc.querySelectorAll('tbody tr');

        finance.revenue = this.parseSingleItem(tableRows, 'Revenue');
        finance.grossMargin = this.parseSingleItem(tableRows, 'Gross Margin');
        finance.operatingIncome = this.parseSingleItem(tableRows, 'Operating Income');
        finance.operatingMargin = this.parseSingleItem(tableRows, 'Operating Margin');
        finance.netIncome = this.parseSingleItem(tableRows, 'Net Income');
        finance.earningsPerShare = this.parseSingleItem(tableRows, 'Earnings Per Share');
        finance.dividends = this.parseSingleItem(tableRows, 'Dividends');
        finance.payoutRatio = this.parseSingleItem(tableRows, 'Payout Ratio');
        finance.shares = this.parseSingleItem(tableRows, 'Shares');
        finance.bookValuePerShare = this.parseSingleItem(tableRows, 'Book Value Per Share');
        finance.operatingCashFlow = this.parseSingleItem(tableRows, 'Operating Cash Flow');
        finance.capSpending = this.parseSingleItem(tableRows, 'Cap Spending');
        finance.freeCashFlow = this.parseSingleItem(tableRows, 'Free Cash Flow');
        finance.freeCashFlowPerShare = this.parseSingleItem(tableRows, 'Free Cash Flow Per Share');
        finance.workingCapital = this.parseSingleItem(tableRows, 'Working Capital');

        return finance;
    }

    private parseSingleItem(tableRows: NodeListOf<Element>, label: string): Array<number> {
        if (!tableRows) {
            return new Array<number>();
        }
        const result = new Array<number>();

        for (let i = 0; i < tableRows.length; i++) {
            const tableRow = tableRows[i];

            if (!tableRow.firstElementChild) {
                continue;
            }
            const firstChildLabel = tableRow.firstElementChild.innerHTML;

            if (firstChildLabel.indexOf(label) >= 0) {
                const children = tableRow.children;

                for (let j = 1; j < children.length; j++) {
                    const childElem = children[j];

                    try {
                        let label = childElem.innerHTML;
                        const idx = label.indexOf(',');

                        if (idx >= 0) {
                            label = label.slice(0, idx) + label.slice(idx + 1, label.length);
                        }
                        result.push(parseFloat(label));
                    } catch (e) {
                        continue;
                    }
                }
            }
        }
        return result;
    }

    getKeyStatPart(searchRequest: SearchRequest): Observable<KeyStat | null> {
        const url = `${this.baseUrl}/${this.type}/${this.keyStatPart}.html?` +
            `t=${searchRequest.stockExchange}:${searchRequest.symbol}` +
            `&region=${searchRequest.region}` +
            `&culture=${searchRequest.culture}`;

        return this.http.get(url)
            .map(resp => {
                const compData = (<FinancialsApiResponse>resp).componentData;
                const keyStat = new KeyStat();

                keyStat.balanceSheetItems = this.parseBalanceSheetItems(compData, this.BALANCE_SHEET_ITEMS);
                keyStat.cashFlowRatios = this.parseCashFlowRatios(compData, this.CASH_FLOW_RATIOS);
                keyStat.efficiency = this.parseEfficiency(compData, this.EFFICIENCY);
                keyStat.liquidityHealth = this.parseLiquidityHealth(compData, this.LIQUIDITY_HEALTH);

                return keyStat;
            })
            .catch(error => {
                return Observable.of(null);
            });
    }

    private parseEfficiency(compData: string, tab: number): Efficiency {
        const efficiency = new Efficiency();
        const parser = new DOMParser();
        const doc = parser.parseFromString(compData, 'text/html');
        const tabElements = doc.querySelectorAll('.tab_content');

        if (!tabElements) {
            return efficiency;
        }
        const efficiencyTab = tabElements[tab];
        const tableElements = efficiencyTab.querySelectorAll('table');

        if (!tableElements) {
            return efficiency;
        }
        const efficiencyTable = tableElements[0];
        const tableRows = efficiencyTable.querySelectorAll('tbody tr');

        if (!tableRows) {
            return efficiency;
        }

        efficiency.daysSalesOutstanding = this.parseSingleItem(tableRows, 'Days Sales Outstanding');
        efficiency.daysInventory = this.parseSingleItem(tableRows, 'Days Inventory');
        efficiency.payablesPeriod = this.parseSingleItem(tableRows, 'Payables Period');
        efficiency.cashConversionCycle = this.parseSingleItem(tableRows, 'Cash Conversion Cycle');
        efficiency.receivablesTurnover = this.parseSingleItem(tableRows, 'Receivables Turnover');
        efficiency.inventoryTurnover = this.parseSingleItem(tableRows, 'Inventory Turnover');
        efficiency.fixedAssetsTurnover = this.parseSingleItem(tableRows, 'Fixed Assets Turnover');
        efficiency.assetTurnover = this.parseSingleItem(tableRows, 'Asset Turnover');

        return efficiency;
    }

    private parseCashFlowRatios(compData: string, tab: number): CashFlowRatios {
        const cashFlowRatios = new CashFlowRatios();
        const parser = new DOMParser();
        const doc = parser.parseFromString(compData, 'text/html');
        const tabElements = doc.querySelectorAll('.tab_content');

        if (!tabElements) {
            return cashFlowRatios;
        }
        const cashFlowRatiosTab = tabElements[tab];
        const tableElements = cashFlowRatiosTab.querySelectorAll('table');

        if (!tableElements) {
            return cashFlowRatios;
        }
        const cashFlowRatiosTable = tableElements[0];
        const tableRows = cashFlowRatiosTable.querySelectorAll('tbody tr');

        if (!tableRows) {
            return cashFlowRatios;
        }

        cashFlowRatios.operatingCashFlowGrowth = this.parseSingleItem(tableRows, 'Operating Cash Flow Growth % YOY');
        cashFlowRatios.freeCashFlowGrowth = this.parseSingleItem(tableRows, 'Free Cash Flow Growth % YOY');
        cashFlowRatios.capExAOfSales = this.parseSingleItem(tableRows, 'Cap Ex as a % of Sales');
        cashFlowRatios.freeCashFlowSales = this.parseSingleItem(tableRows, 'Free Cash Flow/Sales %');
        cashFlowRatios.freeCashFlowNetIncome = this.parseSingleItem(tableRows, 'Free Cash Flow/Net Income');

        return cashFlowRatios;
    }

    private parseBalanceSheetItems(compData: string, tab: number): BalanceSheetItems {
        const balanceSheetItems = new BalanceSheetItems();
        const parser = new DOMParser();
        const doc = parser.parseFromString(compData, 'text/html');
        const tabElements = doc.querySelectorAll('.tab_content');

        if (!tabElements) {
            return balanceSheetItems;
        }
        const balanceSheetTab = tabElements[tab];
        const tableElements = balanceSheetTab.querySelectorAll('table');

        if (!tableElements) {
            return balanceSheetItems;
        }
        const balanceSheetTable = tableElements[0];
        const tableRows = balanceSheetTable.querySelectorAll('tbody tr');

        if (!tableRows) {
            return balanceSheetItems;
        }

        balanceSheetItems.cashShortItemInvestments = this.parseSingleItem(tableRows, 'Short-Term Investments');
        balanceSheetItems.accountsReceivable = this.parseSingleItem(tableRows, 'Accounts Receivable');
        balanceSheetItems.inventory = this.parseSingleItem(tableRows, 'Inventory');
        balanceSheetItems.otherCurrentAssets = this.parseSingleItem(tableRows, 'Other Current Assets');
        balanceSheetItems.totalCurrentAssets = this.parseSingleItem(tableRows, 'Total Current Assets');
        balanceSheetItems.netPPE = this.parseSingleItem(tableRows, 'Net PP');
        balanceSheetItems.intangibles = this.parseSingleItem(tableRows, 'Intangibles');
        balanceSheetItems.otherLongTermAssets = this.parseSingleItem(tableRows, 'Other Long-Term Assets');
        balanceSheetItems.totalAssets = this.parseSingleItem(tableRows, 'Total Assets');
        balanceSheetItems.accountsPayable = this.parseSingleItem(tableRows, 'Accounts Payable');
        balanceSheetItems.shortTermDebt = this.parseSingleItem(tableRows, 'Short-Term Debt');
        balanceSheetItems.taxesPayable = this.parseSingleItem(tableRows, 'Taxes Payable');
        balanceSheetItems.accruedLiabilites = this.parseSingleItem(tableRows, 'Accrued Liabilities');
        balanceSheetItems.otherShortTermLiabilities = this.parseSingleItem(tableRows, 'Other Short-Term Liabilities');
        balanceSheetItems.totalCurrentLiabilities = this.parseSingleItem(tableRows, 'Total Current Liabilities');
        balanceSheetItems.longTermDebt = this.parseSingleItem(tableRows, 'Long-Term Debt');
        balanceSheetItems.otherLongTermLiabilities = this.parseSingleItem(tableRows, 'Other Long-Term Liabilities');
        balanceSheetItems.totalLiabilities = this.parseSingleItem(tableRows, 'Total Liabilities');
        balanceSheetItems.totalStockholdersEquity = this.parseSingleItem(tableRows, 'Total Stockholders');
        balanceSheetItems.totalLiabilities = this.parseSingleItem(tableRows, 'Total Liabilities');

        return balanceSheetItems;
    }

    private parseLiquidityHealth(compData: string, tab: number): LiquidityHealth {
        const liquidityHealth = new LiquidityHealth();
        const parser = new DOMParser();
        const doc = parser.parseFromString(compData, 'text/html');
        const tabElements = doc.querySelectorAll('.tab_content');

        if (!tabElements) {
            return liquidityHealth;
        }
        const liquidityHealthTab = tabElements[tab];
        const tableElements = liquidityHealthTab.querySelectorAll('table');

        if (!tableElements) {
            return liquidityHealth;
        }
        const liquidityHealthTable = tableElements[1];
        const tableRows = liquidityHealthTable.querySelectorAll('tbody tr');

        if (!tableRows) {
            return liquidityHealth;
        }

        liquidityHealth.currentRatio = this.parseSingleItem(tableRows, 'Current Ratio');
        liquidityHealth.quickRatio = this.parseSingleItem(tableRows, 'Quick Ratio');
        liquidityHealth.financialLeverage = this.parseSingleItem(tableRows, 'Financial Leverage');
        liquidityHealth.debtEquity = this.parseSingleItem(tableRows, 'Debt/Equity');

        return liquidityHealth;
    }

}
