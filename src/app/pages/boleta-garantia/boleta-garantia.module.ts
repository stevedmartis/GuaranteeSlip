import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@santander/directives';
import { PipesModule } from '@santander/pipes';

import { BoletaGarantiaRoutingModule } from './boleta-garantia-routing.module';
import { SharedModule } from '@shared/modules/shared.module';
import { StepAComponent } from './step-a/step-a.component';
import { StepBComponent } from './step-b/step-b.component';
import { StepCComponent } from './step-c/step-c.component';
import { StepDComponent } from './step-d/step-d.component';
import { StepEComponent } from './step-e/step-e.component';

import { TermCondEfectivoDialogComponent } from '../dialogs/term-cond-efectivo-dialog/term-cond-efectivo-dialog.component';
import { TermCondContralineaDialogComponent } from '../dialogs/term-cond-contralinea-dialog/term-cond-contralinea-dialog.component';
import { BoletaGarantiaBoxDetailComponent } from '@shared/components/boleta-garantia-box-detail/boleta-garantia-box-detail.component';


@NgModule({
  declarations: [
    StepAComponent,
    StepBComponent,
    StepCComponent,
    StepDComponent,
    StepEComponent,
    TermCondEfectivoDialogComponent,
    TermCondContralineaDialogComponent,
    BoletaGarantiaBoxDetailComponent
  ],
  imports: [
    CommonModule,
    BoletaGarantiaRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    TermCondEfectivoDialogComponent,
    TermCondContralineaDialogComponent
  ]
})
export class BoletaGarantiaModule { }
