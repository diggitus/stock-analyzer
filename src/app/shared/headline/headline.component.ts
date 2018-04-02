import { Component, Input } from '@angular/core';

/**
 * This class represents the headline component.
 */
@Component({
    selector: 'app-headline',
    templateUrl: 'headline.component.html',
    styleUrls: ['headline.component.scss']
})
export class HeadlineComponent {

    @Input() deu: string | null;
    @Input() eng: string | null;

    /**
     * Constructor.
     */
    constructor() {
        this.deu = null;
        this.eng = null;
    }
}
