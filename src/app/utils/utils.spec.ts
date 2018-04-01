import { Utils } from 'app/utils/utils';

describe('Utils', () => {

    it('should return correct average value', () => {
        const values = [10.6, 12.3, 17.7, 15.9, 17.3, 36.9, 19.5, 28, 31.1, 26.2, 29.7];
        const curAvg = Utils.calcAvg(Utils.getLastElements(values, 6));
        expect(curAvg).toBe(26.5);
    });

    it('should return linear least squares', () => {
        const values = [38.58, 38.42, 41.38, 46.60, 50.19, 57.54, 59.84];
        const resList = Utils.findLineByLeastSquares(values);
        expect(resList).not.toBeNull();
        expect(resList![0]).toBe(35.63);
        expect(resList![resList!.length - 1]).toBe(59.38);
    })

    it('should return equity growth', () => {
        const values = [38.58, 38.42, 41.38, 46.60, 50.19, 57.54, 59.84];
        const growth = Utils.equityGrowth(values);
        expect(growth).toBe(66.66);
    })

});