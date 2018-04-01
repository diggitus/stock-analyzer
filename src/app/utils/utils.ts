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
    static sublist(valueList: Array<number> | null, size: number, withTTM = false): Array<number> | null {
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
    static equityRatio(totalStockholdersEquity: Array<number> | null): number | null {
        if (totalStockholdersEquity) {
            return totalStockholdersEquity[totalStockholdersEquity.length - 1];
        }
        return null;
    }

    /**
     * Returns asset turnover of the last 12 months.
     * @param assetTurnover The asset turnover values.
     * @return asset turnover (dt. Kapitalumschlag) of the last 12 months. 
     */
    static assetTurnover(assetTurnover: Array<number> | null): number | null {
        if (assetTurnover) {
            const trend = Utils.trend(Utils.sublist(assetTurnover, 7, true));
            if (trend) {
                return Utils.round(trend[trend.length - 1]);
            }
        }
        return null;
    }

    /**
     * Returns equity growth in %.
     * @param bookPerShare List with book of share values.
     * @return equity growth.
     */
    static equityGrowth(bookPerShare: Array<number> | null): number | null {
        if (bookPerShare) {
            const trend = Utils.trend(Utils.sublist(bookPerShare, 7, true));
            if (trend) {
                const growth = trend[trend.length - 1] / trend[0] - 1;
                return Utils.round(growth * 100);
            }
        }
        return null;
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

        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var count = 0;

        /*
         * We'll use those variables for faster read/write access.
         */
        var x = 0;
        var y = 0;
        var values_length = valueListA.length;

        if (values_length != valueList.length) {
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
        for (var v = 0; v < values_length; v++) {
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
        var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
        var b = (sum_y / count) - (m * sum_x) / count;

        /*
         * We will make the x and y result line now
         */
        var result_values_x = [];
        var result_values_y = [];

        for (var v = 0; v < values_length; v++) {
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
}