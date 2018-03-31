import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from 'app/core/footer/footer.component';
import { HeaderComponent } from 'app/core/header/header.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
})
export class CoreModule { }
