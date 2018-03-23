import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchIndexComponent } from './search-index/search-index.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { LoginGuard } from '../shared/guards/login-guard';

export const searchRoutes: Routes = [
    { path: '', component: SearchIndexComponent },
    { path: 'result/:version', component: SearchResultComponent }
];

@NgModule({
    imports: [RouterModule.forChild(searchRoutes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
