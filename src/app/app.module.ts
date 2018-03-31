import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { NgReduxModule } from '@angular-redux/store/lib/src/ng-redux.module';
import { NgModule } from '@angular/core';
import { AppState } from 'app/app.state';
import { CoreModule } from 'app/core/core.module';
import { PagesModule } from 'app/pages/pages.module';
import { rootReducer } from 'app/rootreducer';
import { FinancialsActions } from 'app/services/financials/financials.actions';
import { FinancialsService } from 'app/services/financials/financials.service';
import { StockService } from 'app/services/stock.service';
import { ValuationActions } from 'app/services/valuation/valuation.actions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuationService } from './services/valuation/valuation.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NgReduxModule,
        CoreModule,
        PagesModule
    ],
    providers: [
        ValuationService,
        ValuationActions,
        FinancialsService,
        FinancialsActions,
        StockService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    /**
     * Constructor
     */
    constructor(
        ngRedux: NgRedux<AppState>,
        devTools: DevToolsExtension
    ) {
        ngRedux.configureStore(
            <any>rootReducer,
            {} as AppState,
            [],
            devTools.isEnabled() ? [devTools.enhancer()] : []
        );
    }

}
