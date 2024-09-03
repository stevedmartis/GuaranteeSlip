import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCComponent } from './step-c.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRefStub } from 'src/app/core/utils/clasesStubs';
import { SingletonModel } from '@models/singleton.model';
import { of } from 'rxjs';
import { ContextService } from '@shared/services/context.service';
import { ModalsService } from '@santander/modals';

describe('StepCComponent', () => {
  let component: StepCComponent;
  let fixture: ComponentFixture<StepCComponent>;
  let router: Router;
  let dialog: MatDialog;
  let contextService: ContextService;
  let modalService: ModalsService;
  let singletonModel: SingletonModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepCComponent ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        ContextService,
        { provide: dialog, useClass: MatDialogRefStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    contextService = TestBed.inject(ContextService);
    modalService = TestBed.inject(ModalsService);
    singletonModel = SingletonModel.getInstance();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cuando método btnSimulateAgain navega al stepA y resetea data singletonModel', () => {
    const spySingleton = spyOn(SingletonModel, 'reset');
    const spyRouter = spyOn(router, 'navigate');

    component.btnSimulateAgain();

    expect(spyRouter).toBeTruthy();
    expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepA`]);
    expect(spySingleton).toHaveBeenCalledTimes(1);
  });

  it('Cuando método btnGoBack navega al stepB', () => {
    const spyRouter = spyOn(router, 'navigate');

    component.btnGoBack();

    expect(spyRouter).toBeTruthy();
    expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepB`]);
  });

  describe('Cuando método btnRegisterBG invoca modal', () => {
    it('Cuando se da aceptar navega a stepD pasando como parámetro ticketNumber y registrationDate', () => {
      let modalOptionSelected: any = of({"close": false, "first": true, "second": false});
      const spyOpenModalSuccess = spyOn(modalService, 'openModalSuccess').and.returnValue(modalOptionSelected);
      const title = "¡Boleta de Garantía registrada con éxito!";
      const body = "La Boleta de Garantía ya está disponible para ser autorizada.";
  
      const spyContext = spyOn(contextService, 'setData');
      const spyRouter = spyOn(router, 'navigate');
  
      const ticketNumber = 234127718129;
      const mockRegistrationDate = new Date(2024, 7, 27);
      jasmine.clock().mockDate(mockRegistrationDate);
      component.btnRegisterBG();
  
      expect(spyOpenModalSuccess).toBeTruthy();
      expect(spyOpenModalSuccess).toHaveBeenCalledWith(title, body, 1, ["Continuar"], 1);
      expect(spyRouter).toBeTruthy();
      expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepD`]);
      expect(spyContext).toHaveBeenCalledWith("ticketNumber", ticketNumber);
      expect(spyContext).toHaveBeenCalledWith("registrationDate", mockRegistrationDate);
    });

    it('Cuando se cierra modal no navega a stepD y no envia parámetros', () => {
      let modalOptionSelected: any = of({"close": true, "first": false, "second": false});
      const spyOpenModalSuccess = spyOn(modalService, 'openModalSuccess').and.returnValue(modalOptionSelected);
      const title = "¡Boleta de Garantía registrada con éxito!";
      const body = "La Boleta de Garantía ya está disponible para ser autorizada.";
  
      const spyContext = spyOn(contextService, 'setData');
      const spyRouter = spyOn(router, 'navigate');
  
      component.btnRegisterBG();
  
      expect(spyOpenModalSuccess).toBeTruthy();
      expect(spyOpenModalSuccess).toHaveBeenCalledWith(title, body, 1, ["Continuar"], 1);
      expect(spyRouter).toHaveBeenCalledTimes(0);
      expect(spyContext).toHaveBeenCalledTimes(0)
    });
  });

});
