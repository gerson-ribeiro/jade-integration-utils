import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JadeIntegrationUtilsModule } from 'projects/jade-integration-utils/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JadeIntegrationUtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
