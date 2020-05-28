import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { JadeIntegrationUtilsModule } from 'jade-integration-utils';
import { HttpStatusService } from 'projects/jade-integration-utils/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    JadeIntegrationUtilsModule
  ],
  exports:[
    HttpClientModule,
    JadeIntegrationUtilsModule
  ],
  providers: [ HttpClient,HttpStatusService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
