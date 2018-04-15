import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeadlineComponent } from 'app/shared/headline/headline.component';
import { ValueBarComponent } from 'app/shared/value-bar/value-bar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeadlineComponent,
        ValueBarComponent
    ],
    exports: [
        HeadlineComponent,
        ValueBarComponent
    ]
})
export class SharedModule { }
