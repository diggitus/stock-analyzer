import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from 'app/pages/dashboard/dashboard-page.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DashboardPageComponent
    ],
    exports: [
        DashboardPageComponent
    ]
})
export class PagesModule { }
