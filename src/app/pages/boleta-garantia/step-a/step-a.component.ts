import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContextService } from '@shared/services/context.service';
import { BeneficiaryType, CoinType, FinancingMode, IssueType } from 'src/app/core/enums';
import { Message } from 'src/app/core/models/message';
import { SingletonModel } from 'src/app/core/models/singleton.model';
import { TermCondEfectivoDialogComponent } from '../../dialogs/term-cond-efectivo-dialog/term-cond-efectivo-dialog.component';
import { TermCondContralineaDialogComponent } from '../../dialogs/term-cond-contralinea-dialog/term-cond-contralinea-dialog.component';
import { cleanMoney } from '@santander/functions';
import { LoadingService } from '@santander/loading';
import { firstValueFrom } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { BoletaGarantiaService } from '@services/boleta-garantia.service';
import { InitialConditionsInput, InitialConditionsOutput } from '@models/boleta-garantia/initial-conditions';
import { AcceptConditionsInput, AcceptConditionsOutput } from '@models/boleta-garantia/accept-conditions';
import { UserContextService } from '@shared/services/user-context.service';
import { ContextModel } from '@shared/models/context.model';

@Component({
  selector: 'app-step-a',
  templateUrl: './step-a.component.html',
  styleUrls: ['./step-a.component.scss', '../../../../assets/scss/extension.compatibility.scss']
})
export class StepAComponent {

  public singletonModel: SingletonModel;
  public simulacionForm: FormGroup | any;
  public _FinancingMode = FinancingMode;
  public _CoinType = CoinType;
  public _IssueType = IssueType;
  public _BeneficiatyType = BeneficiaryType;
  public isSimulated: boolean = false;

  public isAcceptTermCondContralinea: boolean = false;
  public isAcceptTermCondEfectivo: boolean = false;

  // Input AmountField
  public minAmount: number = 0;
  public maxAmount: number = 0;

  // Input ExpirationDateField
  public readonly minDate = new Date();
  public readonly maxDate = new Date();

  private userContextData: ContextModel | undefined;

  public sourceAccounts: AcceptConditionsOutput[] = [];
  public sourceAccountsByCoinType: AcceptConditionsOutput[] = [];

  constructor(
    private readonly router: Router,
    private readonly contextService: ContextService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly loadingService: LoadingService,
    private readonly userContextService: UserContextService,
    private readonly boletaGarantiaService: BoletaGarantiaService
  ) {
    this.singletonModel = SingletonModel.getInstance();
    this.userContextService.getObservable().subscribe((data) => {
      this.userContextData = data;
    });

    this.maxDate.setFullYear(this.minDate.getFullYear() + 1);

    this.simulacionForm = this.formBuilder.group({
      financingModeField: [null, Validators.required],
      amountField: [null, Validators.required],
      typeIssueField: [null, Validators.required],
      expirationDateField: [null, Validators.required]
    });
  }

  /* Modal de termino y condiciones que solo se muestra la primera vez que cliente ingresa al flujo */
  public modalTermCondicionesInitial(financingMode: FinancingMode, isOpBtnAccept: boolean = false) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'bg-sim-modal';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = { isOpBtnAccept: isOpBtnAccept };
    const dialogRef = this.dialog.open(financingMode == this._FinancingMode.CONTRALINEA ? TermCondContralineaDialogComponent : TermCondEfectivoDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      async (data) => {
        if (data.action == 'accept') {
          await this.acceptConditions(financingMode);
        } else if (data.action == 'reject') {
          const message: Message = {
            type: "INFO",
            title: "No es posible continuar",
            description: "Ha decidido no continuar con las condiciones estipuladas. <br/> Al no aceptar estas condiciones, no se podrá acceder a este servicio.",
            alignIsCenter: true,
            textButton: "Ir al inicio"
          }
          this.navigateStepMessage(message);
        } else {
          // close
        }
      }
    );
  }

  public rbChangeFinancingMode(event: any) {
    this.singletonModel.financingModeField = event.value;
    this.initialConditions(event.value).then();
    if (event.value == this._FinancingMode.CONTRALINEA) {
      this.simulacionForm.addControl('sourceAccountCLField', new FormControl(null, [Validators.required]));
      this.simulacionForm.addControl('coinTypeCLField', new FormControl(null, [Validators.required]));
      this.simulacionForm.addControl('typeBeneficiaryField', new FormControl(null, [Validators.required]));
      if (this.simulacionForm.controls['coinTypeField'])
        this.simulacionForm.removeControl('coinTypeField');
      if (this.simulacionForm.controls['sourceAccountField'])
        this.simulacionForm.removeControl('sourceAccountField');
    } else if (event.value == this._FinancingMode.EFECTIVO) {
      this.simulacionForm.addControl('coinTypeField', new FormControl(null, [Validators.required]));
      this.simulacionForm.addControl('sourceAccountField', new FormControl(null, [Validators.required]));
      if (this.simulacionForm.controls['sourceAccountCLField'])
        this.simulacionForm.removeControl('sourceAccountCLField');
      if (this.simulacionForm.controls['coinTypeCLField'])
        this.simulacionForm.removeControl('coinTypeCLField');
      if (this.simulacionForm.controls['typeBeneficiaryField'])
        this.simulacionForm.removeControl('typeBeneficiaryField');
    }

    this.simulacionForm.controls['amountField'].reset();
    this.simulacionForm.controls['typeIssueField'].reset();
    this.simulacionForm.controls['expirationDateField'].reset();
  }

  private async initialConditions(financingMode: FinancingMode) {
    try {
      if (this.userContextData) {

        let isAccept = false;
        if (
          (financingMode == this._FinancingMode.CONTRALINEA && this.isAcceptTermCondContralinea)
          || (financingMode == this._FinancingMode.EFECTIVO && this.isAcceptTermCondEfectivo)
        ) {
          isAccept = true;
        }

        if (!isAccept) {
          const initialConditions: InitialConditionsInput = {
            userId: this.userContextData.uuid.personnumber,
            customerId: this.userContextData.uuid.enterpriserut,
            contractCode: this.userContextData.uuid.contractcode,
            rolCode: (financingMode == this._FinancingMode.EFECTIVO ? 'E' : '') + this.userContextData.uuid.rolcode,
            action: 'C'
          }
          await firstValueFrom(this.boletaGarantiaService.initialConditions(initialConditions)).then(async (response: InitialConditionsOutput) => {
            const showModalAccept = response.flag != 'S';
            if (showModalAccept) {
              if (financingMode == this._FinancingMode.CONTRALINEA) {
                this.modalTermCondicionesInitial(this._FinancingMode.CONTRALINEA, true);
              } else if (financingMode == this._FinancingMode.EFECTIVO) {
                this.modalTermCondicionesInitial(this._FinancingMode.EFECTIVO, true);
              }
            } else {
              this.acceptConditions(financingMode);
              if (financingMode == this._FinancingMode.CONTRALINEA)
                this.isAcceptTermCondContralinea = true;
              if (financingMode == this._FinancingMode.EFECTIVO)
                this.isAcceptTermCondEfectivo = true;
            }
          }, (error: any) => {
            console.error("Error:", error);
          });
        } else {
          this.acceptConditions(financingMode);
        }
        
      }
    } catch (error: any) {
      console.error("stepA", "initialConditions catch:", error);
    }
  }

  private async acceptConditions(financingMode: FinancingMode) {
    if (this.userContextData) {
      const acceptConditions: AcceptConditionsInput = {
        userId: this.userContextData.uuid.personnumber,
        customerId: this.userContextData.uuid.enterpriserut,
        contractCode: this.userContextData.uuid.contractcode,
        rolCode: (financingMode == this._FinancingMode.EFECTIVO ? 'E' : '') + this.userContextData.uuid.rolcode,
        action: 'A',
        serviceCode: this.singletonModel.serviceCode,
        programCode: this.singletonModel.programCode
      }
      await firstValueFrom(this.boletaGarantiaService.acceptConditions(acceptConditions)).then((response: AcceptConditionsOutput[]) => {
        this.sourceAccounts = response;
      }, (error: any) => {
        console.error("Error:", error);
      });
    }
  }

  public changeCoinType(event: MatSelectChange) {
    this.setFilterSourceAccounts(event.value);
    if (this.singletonModel.financingModeField == this._FinancingMode.EFECTIVO) {
      this.simulacionForm.controls['sourceAccountField'].reset();
      this.simulacionForm.controls['amountField'].reset();
    }
    if (event.value == this._CoinType.CLP || event.value == this._CoinType.UF) {
      this.singletonModel.setAmountFormat('$ ', 'CLP', 0);
      this.minAmount = 1;
      this.maxAmount = 5000000000;
    } else if (event.value == this._CoinType.USD) {
      this.singletonModel.setAmountFormat('USD ', 'USD', 2);
      this.minAmount = 1.00;
      this.maxAmount = 10000.00;
    }
  }

  private async setFilterSourceAccounts(coinType: CoinType) {
    this.sourceAccountsByCoinType = this.sourceAccounts.filter(x => x.requirementCode == (coinType == this._CoinType.CLP ? 22: 1));
  }

  public async btnSimular(formulario: FormGroup) {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.loadingService.showFullLoading("Estamos procesando tu solicitud, por favor espera unos segundos.");

    if (this.singletonModel.financingModeField == this._FinancingMode.CONTRALINEA) {
      this.singletonModel.sourceAccountField = this.simulacionForm.get('sourceAccountCLField').value;
      this.singletonModel.typeBeneficiaryField = this.simulacionForm.get('typeBeneficiaryField').value;
      this.singletonModel.coinTypeField = this.simulacionForm.get('coinTypeCLField').value;
    } else if (this.singletonModel.financingModeField == this._FinancingMode.EFECTIVO) {
      this.singletonModel.coinTypeField = this.simulacionForm.get('coinTypeField').value;
      this.singletonModel.sourceAccountField = this.simulacionForm.get('sourceAccountField').value;
    }

    this.singletonModel.amountField = cleanMoney(this.simulacionForm.get('amountField').value);
    this.singletonModel.typeIssueField = this.simulacionForm.get('typeIssueField').value;
    this.singletonModel.expirationDateField = this.simulacionForm.get('expirationDateField').value;

    console.log("singletonModel:", this.singletonModel);

    // ********************* Simulación Outputs servicio
    if (this.singletonModel.financingModeField == this._FinancingMode.CONTRALINEA) {
      this.singletonModel.interestRate = 36.12;
      this.singletonModel.commissionOut = 350000;
    } else if (this.singletonModel.financingModeField == this._FinancingMode.EFECTIVO) {
      this.singletonModel.commissionOut = 350000;
      this.singletonModel.ivaOut = 200000;
      this.singletonModel.amountTotalOut = this.singletonModel.amountField + this.singletonModel.commissionOut + this.singletonModel.ivaOut;
    }
    // ********************* Simulación Outputs servicio

    this.isSimulated = true;
    this.simulacionForm.disable();
    this.loadingService.closeFullLoading();
  }

  public btnGoBack() {
    this.isSimulated = false;
    this.simulacionForm.reset();
    this.simulacionForm.enable();
    this.singletonModel.resetDataStepA();
  }

  public btnContinue() {
    this.contextService.setData("dataEdit", false);
    this.router.navigate([`/boleta-garantia/stepB`]);
  }

  private navigateStepMessage(message: Message) {
    this.contextService.setData("message", message);
    this.router.navigate(['/message']);
  }

}
