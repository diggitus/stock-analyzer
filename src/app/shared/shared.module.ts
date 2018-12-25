import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { HeadlineComponent } from 'app/shared/headline/headline.component';
import { TooltipComponent } from 'app/shared/tooltip/tooltip.component';
import { ValueBarComponent } from 'app/shared/value-bar/value-bar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeadlineComponent,
        ValueBarComponent,
        TooltipComponent,
        DialogComponent
    ],
    exports: [
        HeadlineComponent,
        ValueBarComponent,
        TooltipComponent,
        DialogComponent
    ]
})
export class SharedModule { }
