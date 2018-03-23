import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseService } from './service/base.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  output: string;

  constructor(
    private baseService: BaseService
  ) {
   this.baseService.get().subscribe(resp => {
     this.output = <string>resp;
   });
  }

}
