import { Value } from 'app/model/value';
import { Constants } from 'app/utils/constants';

/**
 * Utils class
 */
export class Utils {

    /**
     * Calculates the average value of the given list item values.
     * @param valueList The item list.
     * @return average value.
     */
    static calcAvg(valueList: Array<number> | null): number | null {
        if (valueList) {
            const avgValue = valueList.reduce((prevValue: number, curValue: number) => prevValue + curValue) / valueList.length;
            return Utils.round(avgValue);
        }
        return null;
    }

    /**
     * Returns sublist of given value list.
     * @param valueList The list with value items.
     * @param size The size of the list after execution of this function.
     * @return sublist.
     */
    static sublist<T>(valueList: Array<T> | null, size: number, withTTM = false): Array<T> | null {
        if (valueList) {
            const startIdx = Math.max(valueList.length - (withTTM ? 0 : 1) - size);
            const endIdx = valueList.length - (withTTM ? 0 : 1);
            return valueList.slice(startIdx, endIdx);
        }
        return null;
    }

    /**
     * Returns the equity ratio.
     * @param totalStockholdersEquity The total stockholders equity (dt. Eigenkapital).
     * @return equityRatio (dt. Eigenkapitalquote).
     */
    static equityRatio(totalStockholdersEquity: Array<number> | null): Value {
        let val = null;

        if (totalStockholdersEquity) {
            val = Utils.lastItem(totalStockholdersEquity);
        }
        return new Value('Eigenkapitalquote', 'equity ratio', val, Constants.TYPE_PERC);
    }

    /**
     * Returns asset turnover of the last 12 months.
     * @param assetTurnover The asset turnover values.
     * @return asset turnover (dt. Kapitalumschlag) of the last 12 months.
     */
    static assetTurnover(assetTurnover: Array<number> | null): Value {
        let val = null;

        if (assetTurnover) {
            const trend = Utils.trend(Utils.sublist(assetTurnover, 7, true));
            if (trend) {
                val = Utils.round(Utils.lastItem(trend));
            }
        }
        return new Value('Kapitalumschlag', 'asset turnover', val);
    }

    /**
     * Returns equity growth in %.
     * @param bookPerShare List with book of share values.
     * @return equity growth (dt. Wachstum Eigenkapital).
     */
    static equityGrowth(bookPerShare: Array<number> | null): Value {
        let val = null;

        if (bookPerShare) {
            const trend = Utils.trend(Utils.sublist(bookPerShare, 7, true));
            if (trend) {
                const growth = Utils.lastItem(trend) / trend[0] - 1;
                val = Utils.round(growth * 100);
            }
        }
        return new Value('Wachstum Eigenkapital', 'equity growth', val, Constants.TYPE_PERC);
    }

    /**
     * Returns the current ratio.
     * @param currentRatio List with current ratio values.
     * @return current ratio (dt. Liquiditätsgrad).
     */
    static currentRatio(currentRatio: Array<number> | null): Value {
        let val = null;

        if (currentRatio) {
            val = Utils.round(Utils.lastItem(currentRatio));
        }
        return new Value('Liquiditätsgrad', 'current ratio', val);
    }

    /**
     * Returns the debt equity.
     * @param debtEquity The debt and equity (dt. Schulden und Eigenkapital).
     * @return debt equity (dt. Verschuldungsgrad).
     */
    static debtEquity(debtEquity: Array<number> | null): Value {
        let val = null;

        if (debtEquity) {
            val = Utils.round(Utils.lastItem(debtEquity));
        }
        return new Value('Verschuldungsgrad', 'debt / equity', val);
    }

    /**
     * Returns the intangibles (Goodwill / Assets).
     * @param intangibles List with intangible values.
     * @return intangibles (dt. Anteil immaterieller Vermögenswerte).
     */
    static intangibles(intangibles: Array<number> | null): Value {
        let val = null;

        if (intangibles) {
            val = Utils.round(Utils.lastItem(intangibles));
        }
        return new Value('Goodwill / Assets', 'intangibles', val, Constants.TYPE_PERC);
    }

    /**
     * Returns the inventory.
     * @param inventory List with inventory values.
     * @return inventory (dt. Inventar).
     */
    static inventory(inventory: Array<number> | null): Value {
        let val = null;

        if (inventory) {
            val = Utils.round(Utils.lastItem(inventory));
        }
        return new Value('Inventar', 'inventory', val, Constants.TYPE_PERC);
    }

    /**
     * Returns the RoE.
     * @param returnOnEquity List with return on equity values.
     * @return return on equity (dt. Eigenkapitalrendite).
     */
    static returnOnEquity(returnOnEquity: Array<number> | null): Value {
        let val = null;

        if (returnOnEquity) {
            val = Utils.round(Utils.lastItem(returnOnEquity));
        }
        return new Value('Eigenkapitalrendite', 'return on equity (RoE)', val, Constants.TYPE_PERC);
    }

    /**
     * Returns the RoA.
     * @param returnOnAssets List with return on assets values.
     * @return return on assets (dt. Gesamtkapitalrendite).
     */
    static returnOnAssets(returnOnAssets: Array<number> | null): Value {
        let val = null;

        if (returnOnAssets) {
            val = Utils.round(Utils.lastItem(returnOnAssets));
        }
        return new Value('Gesamtkapitalrendite', 'return on assets (RoA)', val, Constants.TYPE_PERC);
    }

    /**
     * Returns the ROCE.
     * @param roce List with roce values.
     * @return return on capital employed (dt. Kapitalrendite).
     */
    static returnOnCapitalEmployed(returnOnInvestedCapital: Array<number> | null): Value {
        let val = null;

        if (returnOnInvestedCapital) {
            val = Utils.round(Utils.lastItem(returnOnInvestedCapital));
        }
        return new Value('Kapitalrendite', 'return on capital employed (ROCE)', val, Constants.TYPE_PERC);
    }

    /**
     * Calculates linear least squares.
     * @param valueList List with value items.
     * @return list with line value.
     */
    static trend(valueList: Array<number> | null): Array<number> | null {
        if (!valueList) {
            return null;
        }

        const valueListA = new Array<number>();
        for (let i = 0; i < valueList.length; i++) {
            valueListA.push(i);
        }

        let sum_x = 0;
        let sum_y = 0;
        let sum_xy = 0;
        let sum_xx = 0;
        let count = 0;

        /*
         * We'll use those variables for faster read/write access.
         */
        let x = 0;
        let y = 0;
        const values_length = valueListA.length;

        if (values_length !== valueList.length) {
            throw new Error('The parameters values_x and values_y need to have same size!');
        }

        /*
         * Nothing to do.
         */
        if (values_length === 0) {
            return new Array<number>();
        }

        /*
         * Calculate the sum for each of the parts necessary.
         */
        for (let v = 0; v < values_length; v++) {
            x = valueListA[v];
            y = valueList[v];
            sum_x += x;
            sum_y += y;
            sum_xx += x * x;
            sum_xy += x * y;
            count++;
        }

        /*
         * Calculate m and b for the formular:
         * y = x * m + b
         */
        const m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
        const b = (sum_y / count) - (m * sum_x) / count;

        /*
         * We will make the x and y result line now
         */
        const result_values_x = [];
        const result_values_y = [];

        for (let v = 0; v < values_length; v++) {
            x = valueListA[v];
            y = x * m + b;
            y = Utils.round(y);
            result_values_x.push(x);
            result_values_y.push(y);
        }
        return result_values_y;
    }

    /**
     * Rounds given value, e.g. 12.34
     * @param val The value to round.
     * @return rounded value.
     */
    static round(val: number): number {
        return Math.round(val * 100) / 100;
    }

    /**
     * Returns the last item of the given list.
     * @param values The list
     * @return last item of the given list.
     */
    static lastItem<T>(values: Array<T>): T {
        return values[values.length - 1];
    }
}
