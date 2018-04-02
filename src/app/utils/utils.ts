import { Value } from 'app/model/value';
import { ValueStatus, ValueType } from 'app/utils/enums';

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
        const val = new Value('Eigenkapitalquote', 'equity ratio');
        val.type = ValueType.PERC;

        if (totalStockholdersEquity) {
            val.value = Utils.lastItem(totalStockholdersEquity);
            val.status = Utils.getValueStatus(val, 20, 30);
        }
        return val;
    }

    /**
     * Returns asset turnover of the last 12 months.
     * @param assetTurnover The asset turnover values.
     * @return asset turnover (dt. Kapitalumschlag) of the last 12 months.
     */
    static assetTurnover(assetTurnover: Array<number> | null): Value {
        const val = new Value('Kapitalumschlag', 'asset turnover');

        if (assetTurnover) {
            const trend = Utils.trend(Utils.sublist(assetTurnover, 7, true));
            if (trend) {
                val.value = Utils.round(Utils.lastItem(trend));
                val.status = this.getValueStatus(val, Utils.firstItem(trend));
            }
        }
        return val;
    }

    /**
     * Returns equity growth in %.
     * @param bookPerShare List with book of share values.
     * @return equity growth (dt. Wachstum Eigenkapital).
     */
    static equityGrowth(bookPerShare: Array<number> | null): Value {
        const val = new Value('Wachstum Eigenkapital', 'equity growth');
        val.type = ValueType.PERC;

        if (bookPerShare) {
            const trend = Utils.trend(Utils.sublist(bookPerShare, 7, true));
            if (trend) {
                const growth = Utils.lastItem(trend) / trend[0] - 1;
                val.value = Utils.round(growth * 100);
                val.status = this.getValueStatus(val, 0, 20);
            }
        }
        return val;
    }

    /**
     * Returns the current ratio.
     * @param currentRatio List with current ratio values.
     * @return current ratio (dt. Liquiditätsgrad).
     */
    static currentRatio(currentRatio: Array<number> | null): Value {
        const val = new Value('Liquiditätsgrad', 'current ratio');

        if (currentRatio) {
            val.value = Utils.round(Utils.lastItem(currentRatio));
            val.status = this.getValueStatus(val, 1, 2);
        }
        return val;
    }

    /**
     * Returns the debt equity.
     * @param debtEquity The debt and equity (dt. Schulden und Eigenkapital).
     * @return debt equity (dt. Verschuldungsgrad).
     */
    static debtEquity(debtEquity: Array<number> | null): Value {
        const val = new Value('Verschuldungsgrad', 'debt / equity');

        if (debtEquity) {
            val.value = Utils.round(Utils.lastItem(debtEquity));
            val.status = this.getValueStatus(val, 0.5, 1, true);
        }
        return val;
    }

    /**
     * Returns the intangibles (Goodwill / Assets).
     * @param intangibles List with intangible values.
     * @return intangibles (dt. Anteil immaterieller Vermögenswerte).
     */
    static intangibles(intangibles: Array<number> | null): Value {
        const val = new Value('Goodwill / Assets', 'intangibles');
        val.type = ValueType.PERC;

        if (intangibles) {
            val.value = Utils.round(Utils.lastItem(intangibles));
            val.status = this.getValueStatus(val, 20, null, true);
        }
        return val;
    }

    /**
     * Returns the inventory.
     * @param inventory List with inventory values.
     * @return inventory (dt. Inventar).
     */
    static inventory(inventory: Array<number> | null): Value {
        const val = new Value('Inventar', 'inventory');
        val.type = ValueType.PERC;

        if (inventory) {
            val.value = Utils.round(Utils.lastItem(inventory));
            val.status = this.getValueStatus(val, Utils.firstItem(inventory), null, true);
        }
        return val;
    }

    /**
     * Returns the RoE.
     * @param returnOnEquity List with return on equity values.
     * @return return on equity (dt. Eigenkapitalrendite).
     */
    static returnOnEquity(returnOnEquity: Array<number> | null): Value {
        const val = new Value('Eigenkapitalrendite', 'return on equity (RoE)');
        val.type = ValueType.PERC;

        if (returnOnEquity) {
            val.value = Utils.round(Utils.lastItem(returnOnEquity));
            val.status = this.getValueStatus(val, 10, 15);
        }
        return val;
    }

    /**
     * Returns the RoA.
     * @param returnOnAssets List with return on assets values.
     * @return return on assets (dt. Gesamtkapitalrendite).
     */
    static returnOnAssets(returnOnAssets: Array<number> | null): Value {
        const val = new Value('Gesamtkapitalrendite', 'return on assets (RoA)');
        val.type = ValueType.PERC;

        if (returnOnAssets) {
            val.value = Utils.round(Utils.lastItem(returnOnAssets));
            val.status = this.getValueStatus(val, 5, 10);
        }
        return val;
    }

    /**
     * Returns the ROCE.
     * @param roce List with roce values.
     * @return return on capital employed (dt. Kapitalrendite).
     */
    static returnOnCapitalEmployed(returnOnInvestedCapital: Array<number> | null): Value {
        const val = new Value('Kapitalrendite', 'return on capital employed (ROCE)');
        val.type = ValueType.PERC;

        if (returnOnInvestedCapital) {
            val.value = Utils.round(Utils.lastItem(returnOnInvestedCapital));
            val.status = this.getValueStatus(val, 10, 15);
        }
        return val;
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
     * Returns the first item of the given list.
     * @param values The list
     * @return first item of the given list.
     */
    static firstItem<T>(values: Array<T>): T {
        return values[0];
    }

    /**
     * Returns the last item of the given list.
     * @param values The list
     * @return last item of the given list.
     */
    static lastItem<T>(values: Array<T>): T {
        return values[values.length - 1];
    }

    /**
     * Return value status.
     * @param val The value.
     * @param min The min value of neutral status.
     * @param max The max value of neutral status.
     */
    static getValueStatus(val: Value, min: number, max?: number | null, revert?: boolean): ValueStatus {
        let status = ValueStatus.NEUTRAL;

        if (val.value) {
            if (max) {
                if (val.value > max) {
                    status = ValueStatus.GOOD;
                } else if (val.value < min) {
                    status = ValueStatus.BAD;
                }
            } else {
                if (val.value > min) {
                    status = ValueStatus.GOOD;
                } else {
                    status = ValueStatus.BAD;
                }
            }
        }

        if (revert) {
            if (status === ValueStatus.GOOD) {
                status = ValueStatus.BAD;
            } else if (status === ValueStatus.BAD) {
                status = ValueStatus.GOOD;
            }
        }
        return status;
    }
}
