import { Value } from 'app/model/value';
import { ValueRating } from 'app/utils/enums';

/**
 * Rating class.
 */
export class Rating extends Value {
    avgValue: number | null;
    rating: ValueRating | null;
    ratingValue: number | null;
    ratingLabel: string | null;

    /**
     * Constructor.
     */
    constructor(deu: string, eng: string) {
        super(deu, eng);
        this.avgValue = null;
        this.rating = null;
        this.ratingValue = null;
        this.ratingLabel = null;
    }

}