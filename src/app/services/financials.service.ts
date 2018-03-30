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
 *
 * @see http://financials.morningstar.com/financials/getFinancePart.html?t=XETR:ADS&region=usa&culture=en-US
 * @see http://financials.morningstar.com/financials/getKeyStatPart.html?t=XETR:ADS&region=usa&culture=en-US
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

    /**
     * Constructor
     */
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    /**
     * Returns the finance part.
     * @param searchRequest The search request.
     */
    getFinancePart(searchRequest: SearchRequest): Observable<Finance | null> {
        const url = `${this.baseUrl}/${this.type}/${this.financePart}.html` +
            `?t=${searchRequest.stockExchange}:${searchRequest.symbol}` +
            `&region=${searchRequest.region}` +
            `&culture=${searchRequest.culture}`;

        return this.http.get(url)
            .map(resp => {
                return this.parseFinancePart(<FinancialsApiResponse>resp);
            })
            .catch(error => {
                console.error('Could not fetch finance part');
                return Observable.of(null);
            });
    }

    /**
     * Parses the finance part response.
     * @param resp The finance part response.
     */
    private parseFinancePart(resp: FinancialsApiResponse): Finance {
        const finance = new Finance();
        const parser = new DOMParser();
        const doc = parser.parseFromString(resp.componentData, BaseService.CONTENT_TYPE_HTML);
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

    /**
     * Returns the key stat part.
     * @param searchRequest The search request.
     */
    getKeyStatPart(searchRequest: SearchRequest): Observable<KeyStat | null> {
        const url = `${this.baseUrl}/${this.type}/${this.keyStatPart}.html` +
            `?t=${searchRequest.stockExchange}:${searchRequest.symbol}` +
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
                console.error('Could not fetch key stat part');
                return Observable.of(null);
            });
    }

    /**
     * Parses the efficiency part of the key stat part.
     * @param compData Content of the component data attribute of the response.
     * @param tab The index of the tab content element.
     */
    private parseEfficiency(compData: string, tab: number): Efficiency {
        const efficiency = new Efficiency();
        const tableRows = this.getTableRows(compData, tab, 0);

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

    /**
     * Parses the cash flow ratios part of the key stat part.
     * @param compData Content of the component data attribute of the response.
     * @param tab The index of the tab content element.
     */
    private parseCashFlowRatios(compData: string, tab: number): CashFlowRatios {
        const cashFlowRatios = new CashFlowRatios();
        const tableRows = this.getTableRows(compData, tab, 0);

        cashFlowRatios.operatingCashFlowGrowth = this.parseSingleItem(tableRows, 'Operating Cash Flow Growth % YOY');
        cashFlowRatios.freeCashFlowGrowth = this.parseSingleItem(tableRows, 'Free Cash Flow Growth % YOY');
        cashFlowRatios.capExAOfSales = this.parseSingleItem(tableRows, 'Cap Ex as a % of Sales');
        cashFlowRatios.freeCashFlowSales = this.parseSingleItem(tableRows, 'Free Cash Flow/Sales %');
        cashFlowRatios.freeCashFlowNetIncome = this.parseSingleItem(tableRows, 'Free Cash Flow/Net Income');

        return cashFlowRatios;
    }

    /**
     * Parses the balance sheet part of the key stat part.
     * @param compData Content of the component data attribute of the response.
     * @param tab The index of the tab content element.
     */
    private parseBalanceSheetItems(compData: string, tab: number): BalanceSheetItems {
        const balanceSheetItems = new BalanceSheetItems();
        const tableRows = this.getTableRows(compData, tab, 0);

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

    /**
     * Parses the liquidity health part of the key stat part.
     * @param compData Content of the component data attribute of the response.
     * @param tab The index of the tab content element.
     */
    private parseLiquidityHealth(compData: string, tab: number): LiquidityHealth {
        const liquidityHealth = new LiquidityHealth();
        const tableRows = this.getTableRows(compData, tab, 1);

        liquidityHealth.currentRatio = this.parseSingleItem(tableRows, 'Current Ratio');
        liquidityHealth.quickRatio = this.parseSingleItem(tableRows, 'Quick Ratio');
        liquidityHealth.financialLeverage = this.parseSingleItem(tableRows, 'Financial Leverage');
        liquidityHealth.debtEquity = this.parseSingleItem(tableRows, 'Debt/Equity');

        return liquidityHealth;
    }

    /**
     * Returns all table row elements.
     * @param compData Content of the component data attribute of the response.
     * @param tab The index of the tab content element.
     * @param table The index of the table inside the tab content element.
     */
    private getTableRows(compData: string, tab: number, table: number): NodeListOf<Element> | null {
        let tableRows = null;

        const parser = new DOMParser();
        const doc = parser.parseFromString(compData, BaseService.CONTENT_TYPE_HTML);
        const tabElements = doc.querySelectorAll('.tab_content');

        if (!tabElements) {
            return null;
        }
        const tabElement = tabElements[tab];
        const tableElements = tabElement.querySelectorAll('table');

        if (!tableElements) {
            return null;
        }
        const tableElement = tableElements[table];
        tableRows = tableElement.querySelectorAll('tbody tr');

        if (!tableRows) {
            return null;
        }
        return tableRows;
    }

}
