import { Component, Input } from '@angular/core';
import { FinancingMode } from 'src/app/core/enums';
import { SingletonModel } from 'src/app/core/models/singleton.model';

@Component({
  selector: 'boleta-garantia-box-detail',
  templateUrl: './boleta-garantia-box-detail.component.html',
  styleUrls: ['./boleta-garantia-box-detail.component.scss']
})
export class BoletaGarantiaBoxDetailComponent {

  @Input() inputTicketNumer: string | undefined;
  @Input() inputRegistrationDate: Date | undefined;

  public singletonModel: SingletonModel;

  public _FinancingMode = FinancingMode;

  constructor() {
    this.singletonModel = SingletonModel.getInstance();
  }

}
