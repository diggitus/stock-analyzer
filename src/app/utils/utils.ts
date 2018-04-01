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
            return Math.round(avgValue * 100) / 100;
        }
        return null;
    }

    /**
     * Slices given value list.
     * @param valueList The list with value items.
     * @param size The size of the list after execution of this function.
     * @return sliced list.
     */
    static getLastElements(valueList: Array<number> | null, size: number): Array<number> | null {
        if (valueList) {
            const startIdx = Math.max(valueList.length - 1 - size);
            const endIdx = valueList.length - 1;
            return valueList.slice(startIdx, endIdx);
        }
        return null;
    }
}