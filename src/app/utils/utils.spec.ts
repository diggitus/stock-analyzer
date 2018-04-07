import { ValueRating } from 'app/utils/enums';
import { Utils } from 'app/utils/utils';

// tslint:disable:no-non-null-assertion
describe('Utils', () => {

    it('should return correct average value', () => {
        const values = [10.6, 12.3, 17.7, 15.9, 17.3, 36.9, 19.5, 28, 31.1, 26.2, 29.7];
        const curAvg = Utils.calcAvg(Utils.sublist(values, 6));
        expect(curAvg).toBe(26.5);
    });

    it('should return linear least squares', () => {
        const values = [38.58, 38.42, 41.38, 46.60, 50.19, 57.54, 59.84];
        const resList = Utils.trend(values);
        expect(resList).not.toBeNull();
        expect(resList![0]).toBe(35.63);
        expect(resList![resList!.length - 1]).toBe(59.38);
    });

    it('should return equity growth', () => {
        const values = [38.58, 38.42, 41.38, 46.60, 50.19, 57.54, 59.84];
        const growth = Utils.equityGrowth(values);
        expect(growth.value).toBe(66.66);
    });

    it('should return equity ratio', () => {
        const values = [38.58, 38.42, 41.38, 46.60, 50.19, 57.54, 59.84];
        const equityRatio = Utils.equityRatio(values);
        expect(equityRatio.value).toBe(59.84);
    });

    it('should return asset turnover', () => {
        const values = [1.21, 1.13, 1.23, 1.21, 1.29, 1.25, 1.21, 1.31, 1.35, 1.43, 1.43];
        const assetTurnover = Utils.assetTurnover(values);
        expect(assetTurnover.value).toBe(1.42);
    });

    it('should return the current ratio', () => {
        const values = [1.35, 1.58, 1.50, 1.50, 1.57, 1.45, 1.68, 1.40, 1.31, 1.37, 1.37];
        const currentRatio = Utils.currentRatio(values);
        expect(currentRatio.value).toBe(1.37);
    });

    it('should return the debt equity', () => {
        const values = [0.52, 0.42, 0.29, 0.18, 0.23, 0.12, 0.28, 0.26, 0.15, 0.15, 0.15];
        const debtEquity = Utils.debtEquity(values);
        expect(debtEquity.value).toBe(0.15);
    });

    it('should return the intangibles', () => {
        const values = [32.45, 33.58, 29.46, 28.50, 25.17, 24.03, 22.26, 24.04, 21.47, 18.48, 18.48];
        const intangibles = Utils.intangibles(values);
        expect(intangibles.value).toBe(18.48);
    });

    it('should return the inventory', () => {
        const values = [20.93, 16.57, 19.96, 21.81, 21.34, 22.71, 20.34, 23.33, 24.80, 25.42, 25.42];
        const inventory = Utils.inventory(values);
        expect(inventory.value).toBe(25.42);
    });

    it('should return the RoE', () => {
        const values = [20.03, 6.85, 13.52, 13.50, 9.90, 14.58, 8.82, 11.23, 16.76, 16.98, 16.98];
        const roe = Utils.returnOnEquity(values);
        expect(roe.value).toBe(16.98);
    });

    it('should return the RoA', () => {
        const values = [7.19, 2.66, 5.82, 6.10, 4.57, 6.77, 4.08, 4.92, 7.13, 7.39, 7.39];
        const roa = Utils.returnOnAssets(values);
        expect(roa.value).toBe(7.39);
    });

    it('should return the ROCE', () => {
        const values = [12.75, 6.05, 10.69, 11.40, 8.41, 12.03, 7.26, 8.84, 13.48, 14.58, 14.58];
        const roce = Utils.returnOnCapitalEmployed(values);
        expect(roce.value).toBe(14.58);
    });

    it('should return price earnings rating', () => {
        const rating = Utils.getValueRating(6.6, 9.15, 'KGV', 'price / earnings');
        expect(rating).not.toBeNull();

        if (rating) {
            expect(rating.ratingValue).toBe(27.87);
            expect(rating.rating).toBe(ValueRating.UNDERRATED);
        }
    });

    it('should return dividend yield rating', () => {
        const rating = Utils.getDividendRating(5.6, 3.8, 'Dividendenrendite', 'dividend yield');
        expect(rating).not.toBeNull();

        if (rating) {
            expect(rating.ratingValue).toBe(32.14);
            expect(rating.rating).toBe(ValueRating.UNDERRATED);
        }
    });

});
