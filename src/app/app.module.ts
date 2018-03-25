import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StockService } from 'app/services/stock.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuationService } from './services/valuation.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        ValuationService,
        StockService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
