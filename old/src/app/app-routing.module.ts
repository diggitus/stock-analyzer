import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { signinRoutes } from './login/login-routing.module';
import { searchRoutes } from './search/search-routing.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { LoginGuard } from './shared/guards/login-guard';

const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', children: [...searchRoutes], canActivate: [LoginGuard], canActivateChild: [LoginGuard] },
    { path: 'signin', children: [...signinRoutes] },
    { path: 'error/:error/:return_url', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error/404/%2fsearch', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
