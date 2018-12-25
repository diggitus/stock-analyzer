import { ValueStatus, ValueType } from 'app/utils/enums';

/**
 * This class is for the view. It represents a single value in the view.
 */
export class Value {
    deu: string;
    eng: string;
    value: number | null;
    borders: Array<number> | null;
    type: ValueType;
    status: ValueStatus;
    description: string | null;

    /**
     * Constructor.
     */
    constructor(deu: string, eng: string) {
        this.deu = deu;
        this.eng = eng;
        this.value = null;
        this.borders = null;
        this.type = ValueType.RATIO;
        this.status = ValueStatus.NEUTRAL;
        this.description = null;
    }
}
