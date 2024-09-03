import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalsService } from '@santander/modals';
import { ContextService } from '@shared/services/context.service';
import { CoinType, FinancingMode } from 'src/app/core/enums';
import { SingletonModel } from 'src/app/core/models/singleton.model';

@Component({
  selector: 'app-step-c',
  templateUrl: './step-c.component.html',
  styleUrls: ['./step-c.component.scss']
})
export class StepCComponent {

  public singletonModel: SingletonModel;
  public _FinancingMode = FinancingMode;
  public _CoinType = CoinType;

  constructor(
    private router: Router,
    private modalService: ModalsService,
    private contextService: ContextService,
  ) {
    this.singletonModel = SingletonModel.getInstance();
  }

  public btnSimulateAgain() {
    SingletonModel.reset();
    this.router.navigate([`/boleta-garantia/stepA`]);
  }

  public btnGoBack() {
    this.router.navigate([`/boleta-garantia/stepB`]);
  }

  public btnRegisterBG() {
    const title = "¡Boleta de Garantía registrada con éxito!";
    const body = "La Boleta de Garantía ya está disponible para ser autorizada.";
    this.modalService.openModalSuccess(title, body, 1, ["Continuar"], 1).subscribe(data => {
      if (data.first) {
        this.contextService.setData("ticketNumber", 234127718129);
        this.contextService.setData("registrationDate", new Date());
        this.router.navigate([`/boleta-garantia/stepD`]);
      }
    });
  }

}
