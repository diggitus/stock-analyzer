import { Constants } from 'app/utils/constants';

/**
 * This class is for the view. It represents a single value in the view.
 */
export class Value {
    deu: string;
    eng: string;
    value: number | null;
    type?: number;

    /**
     * Constructor.
     */
    constructor(
        deu: string,
        eng: string,
        value: number | null,
        type?: number
    ) {
        this.deu = deu;
        this.eng = eng;
        this.value = value;
        this.type = type === undefined ? Constants.TYPE_RATIO : type;
    }
}
