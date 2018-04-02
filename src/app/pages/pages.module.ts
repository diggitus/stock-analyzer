import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from 'app/pages/dashboard/dashboard-page.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        DashboardPageComponent
    ],
    exports: [
        DashboardPageComponent
    ]
})
export class PagesModule { }
