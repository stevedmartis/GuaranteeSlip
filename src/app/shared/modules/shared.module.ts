import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { PipesModule } from '@santander/pipes';
import { LayoutComponent } from '@shared/layouts/layout/layout.component';
import { ContextualMessageModule } from '@santander/contextual-message';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from 'src/app/core/constants/CustomDateAdapter.constants';

import { AmountInputDirective } from 'src/app/core/directives/amount.input.directive';
import { AccountObPipe } from 'src/app/core/pipes/account-ob.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    AmountInputDirective,
    AccountObPipe
  ],
  imports: [
    CommonModule,
    PipesModule,
    FlexLayoutModule,
    GridModule,
    MaterialModule,
    ContextualMessageModule
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  exports: [
    PipesModule,
    FlexLayoutModule,
    GridModule,
    LayoutComponent,
    MaterialModule,
    ContextualMessageModule,
    AmountInputDirective,
    AccountObPipe
  ]
})
export class SharedModule {
}
