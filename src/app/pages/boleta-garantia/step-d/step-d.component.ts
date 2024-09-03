import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TypeMessage } from '@santander/contextual-message';
import { ModalsService } from '@santander/modals';
import { ContextService } from '@shared/services/context.service';
import { FinancingMode } from 'src/app/core/enums';
import { SingletonModel } from 'src/app/core/models/singleton.model';

@Component({
  selector: 'app-step-d',
  templateUrl: './step-d.component.html',
  styleUrls: ['./step-d.component.scss']
})
export class StepDComponent {

  public singletonModel: SingletonModel;
  public informativeMessageType = TypeMessage.INFORMATIVE;
  public ticketNumber: string;
  public registrationDate: Date;
  public _FinancingMode = FinancingMode;
  public isClickAutorize: boolean = false;

  constructor(
    private router: Router,
    private modalService: ModalsService,
    private contextService: ContextService
  ) { 
    this.ticketNumber = this.contextService.getData('ticketNumber');
    this.registrationDate = this.contextService.getData('registrationDate');
    this.singletonModel = SingletonModel.getInstance();
  }

  public btnDataEdit() {
    this.contextService.setData("dataEdit", true);
    this.router.navigate([`/boleta-garantia/stepB`]);
  }

  public btnRegisterAnotherBG() {
    SingletonModel.reset();
    this.router.navigate([`/boleta-garantia/stepA`]);
  }

  public btnAutorize() {
    const title = "¡Boleta de Garantía autorizada con éxito!";
    const body = "La Boleta de Garantía ya se encuentra autorizada con la firma correspondiente.";
    this.modalService.openModalSuccess(title, body, 1, ["Aceptar"], 1).subscribe(data => {
      if (data.first) {
        this.contextService.setData("ticketNumber", this.ticketNumber);
        this.contextService.setData("registrationDate", this.registrationDate);
        this.router.navigate([`/boleta-garantia/stepE`]);
      }
    });
    
  }

}
