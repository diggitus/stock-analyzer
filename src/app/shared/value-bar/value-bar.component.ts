import { Component, Input } from '@angular/core';

/**
 * This class represents the value bar component.
 */
@Component({
    selector: 'app-value-bar',
    templateUrl: './value-bar.component.html',
    styleUrls: ['./value-bar.component.scss']
})
export class ValueBarComponent {

    @Input() maxValue: number;
    @Input() value: number;
    @Input() borders: Array<number>;

    /**
     * Constructor.
     */
    constructor() {
        this.maxValue = 100;
        this.value = 0;
        this.borders = new Array<number>();
    }
}
