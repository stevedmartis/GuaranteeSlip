import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';
import { SharedModule } from '@shared/modules/shared.module';
import { CoreModule } from '@angular/flex-layout';
import { DirectivesModule } from '@santander/directives';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule,
    CoreModule,
    DirectivesModule
  ]
})
export class MessageModule { }
