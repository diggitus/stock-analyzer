import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeadlineComponent } from 'app/shared/headline/headline.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeadlineComponent
    ],
    exports: [
        HeadlineComponent
    ]
})
export class SharedModule { }
