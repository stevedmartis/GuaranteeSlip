import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRefStub } from 'src/app/core/utils/clasesStubs';

import { StepAComponent } from './step-a.component';
import { TermCondContralineaDialogComponent } from '../../dialogs/term-cond-contralinea-dialog/term-cond-contralinea-dialog.component';
import { TermCondEfectivoDialogComponent } from '../../dialogs/term-cond-efectivo-dialog/term-cond-efectivo-dialog.component';
import { of } from 'rxjs';
import { Message } from 'src/app/core/models/message';
import { CoinType, FinancingMode } from 'src/app/core/enums';
import { SingletonModel } from '@models/singleton.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContextService } from '@shared/services/context.service';


describe('StepAComponent', () => {
  let component: StepAComponent;
  let fixture: ComponentFixture<StepAComponent>;
  let router: Router;
  let dialog: MatDialog;
  let contextService: ContextService;
  let _CoinType = CoinType;
  let singletonModel: SingletonModel;
  let _FinancingMode = FinancingMode;

  let propertiesFrame = (window as any)['propertiesFrame'] = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepAComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        ContextService,
        FormBuilder,
        { provide: dialog, useClass: MatDialogRefStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepAComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    contextService = TestBed.inject(ContextService);
    singletonModel = SingletonModel.getInstance();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Cuando método modalTermCondicionesInitial invoca TermCondEfectivoDialogComponent', () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'bg-sim-modal';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    it('Cuando dentro del modal se da click en botón Aceptar', () => {
      const isOpBtnAccept = true;
      dialogConfig.data = { isOpBtnAccept: isOpBtnAccept }
      const modalOptionSelected: any = { action: 'accept' };
      const afterClosedModal: any = { afterClosed: () => of(modalOptionSelected) };
      const spyDialogOpen = spyOn(dialog, 'open').and.returnValue(afterClosedModal);
      const spyNavigateStepMessage = spyOn<any>(component, 'navigateStepMessage');


      component.modalTermCondicionesInitial(_FinancingMode.EFECTIVO, true);

      expect(spyDialogOpen).toBeTruthy();
      expect(spyDialogOpen).toHaveBeenCalledWith(TermCondEfectivoDialogComponent, dialogConfig);
      expect(spyNavigateStepMessage).toHaveBeenCalledTimes(0);
    });

    it('Cuando dentro del modal se da click en botón Rechazar, se llama a component message con mensaje informativo', () => {
      const isOpBtnAccept = true;
      dialogConfig.data = { isOpBtnAccept: isOpBtnAccept }
      const modalOptionSelected: any = { action: 'reject' };
      const afterClosedModal: any = { afterClosed: () => of(modalOptionSelected) };
      const spyDialogOpen = spyOn(dialog, 'open').and.returnValue(afterClosedModal);
      const spyNavigateStepMessage = spyOn<any>(component, 'navigateStepMessage');
      const message: Message = {
        type: "INFO",
        title: "No es posible continuar",
        description: "Ha decidido no continuar con las condiciones estipuladas. <br/> Al no aceptar estas condiciones, no se podrá acceder a este servicio.",
        alignIsCenter: true,
        textButton: "Ir al inicio"
      }

      component.modalTermCondicionesInitial(_FinancingMode.EFECTIVO, true);

      expect(spyDialogOpen).toBeTruthy();
      expect(spyDialogOpen).toHaveBeenCalledWith(TermCondEfectivoDialogComponent, dialogConfig);
      expect(spyNavigateStepMessage).toHaveBeenCalledTimes(1);
      expect(spyNavigateStepMessage).toHaveBeenCalledWith(message);
    });

    it('Cuando dentro del modal se da click en botón Cerrar', () => {
      const isOpBtnAccept = false;
      dialogConfig.data = { isOpBtnAccept: isOpBtnAccept }
      const modalOptionSelected: any = { action: 'close' };
      const afterClosedModal: any = { afterClosed: () => of(modalOptionSelected) };
      const spyDialogOpen = spyOn(dialog, 'open').and.returnValue(afterClosedModal);
      const spyNavigateStepMessage = spyOn<any>(component, 'navigateStepMessage');

      component.modalTermCondicionesInitial(_FinancingMode.EFECTIVO);

      expect(spyDialogOpen).toBeTruthy();
      expect(spyDialogOpen).toHaveBeenCalledWith(TermCondEfectivoDialogComponent, dialogConfig);
      expect(spyNavigateStepMessage).toHaveBeenCalledTimes(0);
    });
  });

  describe('Cuando método modalTermCondicionesInitial invoca TermCondContralineaDialogComponent', () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'bg-sim-modal';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    it('Cuando dentro del modal se da click en botón Aceptar', () => {
      const isOpBtnAccept = true;
      dialogConfig.data = { isOpBtnAccept: isOpBtnAccept }
      const modalOptionSelected: any = { action: 'accept' };
      const afterClosedModal: any = { afterClosed: () => of(modalOptionSelected) };
      const spyDialogOpen = spyOn(dialog, 'open').and.returnValue(afterClosedModal);
      const spyNavigateStepMessage = spyOn<any>(component, 'navigateStepMessage');

      component.modalTermCondicionesInitial(_FinancingMode.CONTRALINEA, true);

      expect(spyDialogOpen).toBeTruthy();
      expect(spyDialogOpen).toHaveBeenCalledWith(TermCondContralineaDialogComponent, dialogConfig);
      expect(spyNavigateStepMessage).toHaveBeenCalledTimes(0);
    });

    it('Cuando dentro del modal se da click en botón Rechazar, se llama a component message con mensaje informativo', () => {
      const isOpBtnAccept = true;
      dialogConfig.data = { isOpBtnAccept: isOpBtnAccept }
      const modalOptionSelected: any = { action: 'reject' };
      const afterClosedModal: any = { afterClosed: () => of(modalOptionSelected) };
      const spyDialogOpen = spyOn(dialog, 'open').and.returnValue(afterClosedModal);
      const spyNavigateStepMessage = spyOn<any>(component, 'navigateStepMessage');
      const message: Message = {
        type: "INFO",
        title: "No es posible continuar",
        description: "Ha decidido no continuar con las condiciones estipuladas. <br/> Al no aceptar estas condiciones, no se podrá acceder a este servicio.",
        alignIsCenter: true,
        textButton: "Ir al inicio"
      }

      component.modalTermCondicionesInitial(_FinancingMode.CONTRALINEA, true);

      expect(spyDialogOpen).toBeTruthy();
      expect(spyDialogOpen).toHaveBeenCalledWith(TermCondContralineaDialogComponent, dialogConfig);
      expect(spyNavigateStepMessage).toHaveBeenCalledTimes(1);
      expect(spyNavigateStepMessage).toHaveBeenCalledWith(message);
    });

    it('Cuando dentro del modal se da click en botón Cerrar', () => {
      const isOpBtnAccept = false;
      dialogConfig.data = { isOpBtnAccept: isOpBtnAccept }
      const modalOptionSelected: any = { action: 'close' };
      const afterClosedModal: any = { afterClosed: () => of(modalOptionSelected) };
      const spyDialogOpen = spyOn(dialog, 'open').and.returnValue(afterClosedModal);
      const spyNavigateStepMessage = spyOn<any>(component, 'navigateStepMessage');

      component.modalTermCondicionesInitial(_FinancingMode.CONTRALINEA);

      expect(spyDialogOpen).toBeTruthy();
      expect(spyDialogOpen).toHaveBeenCalledWith(TermCondContralineaDialogComponent, dialogConfig);
      expect(spyNavigateStepMessage).toHaveBeenCalledTimes(0);
    });
  });

  describe('Cuando se ejecuta método rbChangeFinancingMode al seleccionar el modo de financiamiento', () => {

    describe('Cuando la selección es Contra línea', () => {
      const eventSelect: any = { value: _FinancingMode.CONTRALINEA };
      
      it('agrega sourceAccountCLField, coinTypeCLField, typeBeneficiaryField a los controls del formulario', () => {
        const formGroup = component.simulacionForm;
        const formValues = {
          financingModeField: null,
          amountField: null,
          typeIssueField: null,
          expirationDateField: null,
          sourceAccountCLField: null,
          coinTypeCLField: null,
          typeBeneficiaryField: null
        }
  
        component.rbChangeFinancingMode(eventSelect);
  
        expect(formGroup.value).toEqual(formValues);
      });

      it('elimina coinTypeField, sourceAccountField a los controls del formulario si existen', () => {
        component.simulacionForm.addControl('coinTypeField', new FormControl(null, [Validators.required]));
        component.simulacionForm.addControl('sourceAccountField', new FormControl(null, [Validators.required]));
        const formGroup = component.simulacionForm;
        const formValues = {
          financingModeField: null,
          amountField: null,
          typeIssueField: null,
          expirationDateField: null,
          sourceAccountCLField: null,
          coinTypeCLField: null,
          typeBeneficiaryField: null
        }
  
        component.rbChangeFinancingMode(eventSelect);
  
        expect(formGroup.value).toEqual(formValues);
      });
    });

    describe('Cuando la selección es Efectivo', () => {
      const eventSelect: any = { value: _FinancingMode.EFECTIVO };
      
      it('agrega coinTypeField, sourceAccountField a los controls del formulario', () => {
        const formGroup = component.simulacionForm;
        const formValues = {
          financingModeField: null,
          amountField: null,
          typeIssueField: null,
          expirationDateField: null,
          coinTypeField: null,
          sourceAccountField: null
        }
  
        component.rbChangeFinancingMode(eventSelect);
  
        expect(formGroup.value).toEqual(formValues);
      });

      it('elimina sourceAccountCLField, coinTypeCLField, typeBeneficiaryField a los controls del formulario si existen', () => {
        component.simulacionForm.addControl('sourceAccountCLField', new FormControl(null, [Validators.required]));
        component.simulacionForm.addControl('coinTypeCLField', new FormControl(null, [Validators.required]));
        component.simulacionForm.addControl('typeBeneficiaryField', new FormControl(null, [Validators.required]));
        const formGroup = component.simulacionForm;
        const formValues = {
          financingModeField: null,
          amountField: null,
          typeIssueField: null,
          expirationDateField: null,
          coinTypeField: null,
          sourceAccountField: null
        }
  
        component.rbChangeFinancingMode(eventSelect);
  
        expect(formGroup.value).toEqual(formValues);
      });
    });

  });

  describe('Cuando se ejecuta método changeCoinType al seleccionar un tipo de moneda', () => {

    describe('Cuando modo de financiamiento es Contra línea', () => {
      beforeEach(() => {
        const eventSelect: any = { value: _FinancingMode.CONTRALINEA };
        component.rbChangeFinancingMode(eventSelect);
      });

      it('Cuando la seleccion es CLP aplica formato $, sin decimales, monto mínimo $1 y monto máximo $5.000.000.000', () => {
        const eventSelect: any = { value: _CoinType.CLP };
        const spySingletonSetAmountFormat = spyOn(singletonModel, 'setAmountFormat');
  
        component.changeCoinType(eventSelect);
  
        expect(spySingletonSetAmountFormat).toBeTruthy();
        expect(spySingletonSetAmountFormat).toHaveBeenCalledTimes(1);
        expect(spySingletonSetAmountFormat).toHaveBeenCalledWith('$ ', 'CLP', 0);
        expect(component.minAmount).toEqual(1);
        expect(component.maxAmount).toEqual(5000000000);
      });
  
      it('Cuando la seleccion es UF aplica formato $, sin decimales, monto mínimo $1 y monto máximo $5.000.000.000', () => {
        const eventSelect: any = { value: _CoinType.UF };
        const spySingletonSetAmountFormat = spyOn(singletonModel, 'setAmountFormat');
  
        component.changeCoinType(eventSelect);
  
        expect(spySingletonSetAmountFormat).toBeTruthy();
        expect(spySingletonSetAmountFormat).toHaveBeenCalledTimes(1);
        expect(spySingletonSetAmountFormat).toHaveBeenCalledWith('$ ', 'CLP', 0);
        expect(component.minAmount).toEqual(1);
        expect(component.maxAmount).toEqual(5000000000);
      });
  
      it('Cuando la seleccion es USD aplica formato USD, con 2 decimales, monto mínimo USD1,00 y monto máximo USD10.000,00', () => {
        const eventSelect: any = { value: _CoinType.USD };
        const spySingletonSetAmountFormat = spyOn(singletonModel, 'setAmountFormat');
  
        component.changeCoinType(eventSelect);
  
        expect(spySingletonSetAmountFormat).toBeTruthy();
        expect(spySingletonSetAmountFormat).toHaveBeenCalledTimes(1);
        expect(spySingletonSetAmountFormat).toHaveBeenCalledWith('USD ', 'USD', 2);
        expect(component.minAmount).toEqual(1.00);
        expect(component.maxAmount).toEqual(10000.00);
      });
    });

    describe('Cuando modo de financiamiento es Efectivo', () => {
      beforeEach(() => {
        const eventSelect: any = { value: _FinancingMode.EFECTIVO };
        component.rbChangeFinancingMode(eventSelect);
      });

      it('Aplica reset a sourceAccountField y amountField', () => {
        const eventSelect: any = { value: _CoinType.CLP };
        const spySourceAccountFieldReset = spyOn(component.simulacionForm.controls['sourceAccountField'], 'reset');
        const spyAmountFieldReset = spyOn(component.simulacionForm.controls['amountField'], 'reset');
        component.changeCoinType(eventSelect);
        expect(spySourceAccountFieldReset).toBeTruthy();
        expect(spySourceAccountFieldReset).toHaveBeenCalledTimes(1);
        expect(spyAmountFieldReset).toBeTruthy();
        expect(spyAmountFieldReset).toHaveBeenCalledTimes(1);
      })

      it('Cuando la seleccion es CLP aplica formato $, sin decimales, monto mínimo $1 y monto máximo $5.000.000.000', () => {
        const eventSelect: any = { value: _CoinType.CLP };
        const spySingletonSetAmountFormat = spyOn(singletonModel, 'setAmountFormat');
  
        component.changeCoinType(eventSelect);
  
        expect(spySingletonSetAmountFormat).toBeTruthy();
        expect(spySingletonSetAmountFormat).toHaveBeenCalledTimes(1);
        expect(spySingletonSetAmountFormat).toHaveBeenCalledWith('$ ', 'CLP', 0);
        expect(component.minAmount).toEqual(1);
        expect(component.maxAmount).toEqual(5000000000);
      });
  
      it('Cuando la seleccion es UF aplica formato $, sin decimales, monto mínimo $1 y monto máximo $5.000.000.000', () => {
        const eventSelect: any = { value: _CoinType.UF };
        const spySingletonSetAmountFormat = spyOn(singletonModel, 'setAmountFormat');
  
        component.changeCoinType(eventSelect);
  
        expect(spySingletonSetAmountFormat).toBeTruthy();
        expect(spySingletonSetAmountFormat).toHaveBeenCalledTimes(1);
        expect(spySingletonSetAmountFormat).toHaveBeenCalledWith('$ ', 'CLP', 0);
        expect(component.minAmount).toEqual(1);
        expect(component.maxAmount).toEqual(5000000000);
      });
  
      it('Cuando la seleccion es USD aplica formato USD, con 2 decimales, monto mínimo USD1,00 y monto máximo USD10.000,00', () => {
        const eventSelect: any = { value: _CoinType.USD };
        const spySingletonSetAmountFormat = spyOn(singletonModel, 'setAmountFormat');
  
        component.changeCoinType(eventSelect);
  
        expect(spySingletonSetAmountFormat).toBeTruthy();
        expect(spySingletonSetAmountFormat).toHaveBeenCalledTimes(1);
        expect(spySingletonSetAmountFormat).toHaveBeenCalledWith('USD ', 'USD', 2);
        expect(component.minAmount).toEqual(1.00);
        expect(component.maxAmount).toEqual(10000.00);
      });
    });

  });

  it('Cuando método btnContinue navega al stepB', () => {
    const spyContext = spyOn(contextService, 'setData');
    const spyRouter = spyOn(router, 'navigate');

    component.btnContinue();

    expect(spyRouter).toBeTruthy();
    expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepB`]);
    expect(spyContext).toHaveBeenCalledWith("dataEdit", false);
  });

  it('Cuando método btnGoBack limpia formulario y datos en singletonModel', () => {
    const spyFormReset = spyOn(component.simulacionForm, 'reset');
    const spyFormEneble = spyOn(component.simulacionForm, 'enable');
    const spySingletonResetDataStepA = spyOn(component.singletonModel, 'resetDataStepA');

    component.btnGoBack();

    expect(spyFormReset).toBeTruthy();
    expect(spyFormReset).toHaveBeenCalledTimes(1);
    expect(spyFormEneble).toHaveBeenCalledTimes(1);
    expect(spySingletonResetDataStepA).toHaveBeenCalledTimes(1);
  });

});
