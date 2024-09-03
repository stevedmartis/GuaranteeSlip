import { Component } from '@angular/core';
import { ContextService } from '@shared/services/context.service';
import { Message } from 'src/app/core/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  message: Message;

  constructor(private contextService: ContextService) {
    this.message = this.contextService.getData('message');
  }

  public navigateToHome(): void {
    // Pendiente ****
    console.error('Falta funcionalidad para navegar al inicio');
  }

}
