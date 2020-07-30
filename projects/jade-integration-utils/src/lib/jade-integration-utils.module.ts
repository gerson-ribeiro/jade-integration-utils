import { NgModule, Injector } from '@angular/core';
import { JadeIntegrationUtilsComponent } from './jade-integration-utils.component';
import { CheckRoleDirective } from './directives/check-role.directive';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GenericService } from './services/generic.service';
import {  HttpClientModule } from '@angular/common/http';

export let InjectorInstance: Injector;
@NgModule({
  declarations: [
    JadeIntegrationUtilsComponent,
    CheckRoleDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports:[
    HttpClientModule
  ],
  bootstrap:[JadeIntegrationUtilsComponent]
})
export class JadeIntegrationUtilsModule {
  constructor(private _injector: Injector) {
    InjectorInstance = this._injector;
  }
}
