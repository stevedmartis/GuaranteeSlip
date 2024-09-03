import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepAComponent } from './step-a/step-a.component';
import { StepBComponent } from './step-b/step-b.component';
import { StepCComponent } from './step-c/step-c.component';
import { StepDComponent } from './step-d/step-d.component';
import { StepEComponent } from './step-e/step-e.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stepA',
  },
  {
    path: 'stepA',
    component: StepAComponent
  },
  {
    path: 'stepB',
    component: StepBComponent
  },
  {
    path: 'stepC',
    component: StepCComponent
  },
  {
    path: 'stepD',
    component: StepDComponent
  },
  {
    path: 'stepE',
    component: StepEComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletaGarantiaRoutingModule {
 
}
