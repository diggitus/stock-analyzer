import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverviewPageComponent } from 'app/pages/overview/overview-page.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OverviewPageComponent
    ],
    exports: [
        OverviewPageComponent
    ]
})
export class PagesModule { }
