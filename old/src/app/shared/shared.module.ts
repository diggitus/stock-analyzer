import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { DialogComponent } from './dialog/dialog.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        DropDownComponent,
        DialogComponent,
        SidebarComponent
    ],
    imports: [
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        DropDownComponent,
        DialogComponent,
        SidebarComponent,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class SharedModule { }
