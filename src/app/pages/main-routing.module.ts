import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivateChild: [GuarService],
    children: [
      {
        path: 'boleta-garantia',
        loadChildren: () => import('./boleta-garantia/boleta-garantia.module').then(m => m.BoletaGarantiaModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./message/message.module').then(m => m.MessageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
