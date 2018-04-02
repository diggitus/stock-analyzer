import { ValueStatus, ValueType } from 'app/utils/enums';

/**
import { ValueStatus, ValueType } from 'app/utils/enums';

 * This class is for the view. It represents a single value in the view.
 */
export class Value {
    deu: string;
    eng: string;
    value: number | null;
    type: ValueType;
    status: ValueStatus;

    /**
     * Constructor.
     */
    constructor(deu: string, eng: string) {
        this.deu = deu;
        this.eng = eng;
        this.value = null;
        this.type = ValueType.RATIO;
        this.status = ValueStatus.NEUTRAL;
    }
}
