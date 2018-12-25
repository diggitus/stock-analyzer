import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

    @Input() description: string | null;

    visible: boolean;

    constructor() {
        this.description = null;
        this.visible = false;
    }

    /**
     * Toggles the visibility of the tooltip.
     */
    toggleTooltip() {
        this.visible = !this.visible;
    }


}
