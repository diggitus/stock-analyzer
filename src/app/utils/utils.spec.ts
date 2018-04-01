import { Utils } from 'app/utils/utils';

describe('Utils', () => {

    it('should return correct average value', () => {
        const values = [10.6, 12.3, 17.7, 15.9, 17.3, 36.9, 19.5, 28, 31.1, 26.2, 29.7];
        const curAvg = Utils.calcAvg(Utils.getLastElements(values, 6));
        expect(curAvg).toBe(26.5);
    });

});