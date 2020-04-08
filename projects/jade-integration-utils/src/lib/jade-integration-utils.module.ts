import { NgModule } from '@angular/core';
import { JadeIntegrationUtilsComponent } from './jade-integration-utils.component';
import { CheckRoleDirective } from './directives/check-role.directive';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    JadeIntegrationUtilsComponent,
    CheckRoleDirective
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    JadeIntegrationUtilsComponent
  ],
  bootstrap:[JadeIntegrationUtilsComponent]
})
export class JadeIntegrationUtilsModule { }
