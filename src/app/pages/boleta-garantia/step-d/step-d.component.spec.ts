import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDComponent } from './step-d.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContextService } from '@shared/services/context.service';
import { SingletonModel } from '@models/singleton.model';
import { ModalsService } from '@santander/modals';
import { of } from 'rxjs';

describe('StepDComponent', () => {
  let component: StepDComponent;
  let fixture: ComponentFixture<StepDComponent>;
  let router: Router;
  let dialog: MatDialog;
  let contextService: ContextService;
  let modalService: ModalsService;
  let singletonModel: SingletonModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepDComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        ContextService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDComponent);
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

  it('Cuando método btnDataEdit navega al stepB pasando parámetro dataEdit = true', () => {
    const spyContext = spyOn(contextService, 'setData');
    const spyRouter = spyOn(router, 'navigate');

    component.btnDataEdit();

    expect(spyRouter).toBeTruthy();
    expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepB`]);
    expect(spyContext).toHaveBeenCalledWith("dataEdit", true);
  });

  it('Cuando método btnRegisterAnotherBG navega al stepA y resetea data singletonModel', () => {
    const spySingleton = spyOn(SingletonModel, 'reset');
    const spyRouter = spyOn(router, 'navigate');

    component.btnRegisterAnotherBG();

    expect(spyRouter).toBeTruthy();
    expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepA`]);
    expect(spySingleton).toHaveBeenCalledTimes(1);
  });

  describe('Cuando método btnAutorize invoca modal', () => {
    it('Cuando se da aceptar navega a stepE pasando como parámetro ticketNumber y registrationDate', () => {
      let modalOptionSelected: any = of({"close": false, "first": true, "second": false});
      const spyOpenModalSuccess = spyOn(modalService, 'openModalSuccess').and.returnValue(modalOptionSelected);
      const title = "¡Boleta de Garantía autorizada con éxito!";
      const body = "La Boleta de Garantía ya se encuentra autorizada con la firma correspondiente.";
  
      const spyContext = spyOn(contextService, 'setData');
      const spyRouter = spyOn(router, 'navigate');
  
      component.btnAutorize();
  
      expect(spyOpenModalSuccess).toBeTruthy();
      expect(spyOpenModalSuccess).toHaveBeenCalledWith(title, body, 1, ["Aceptar"], 1);
      expect(spyRouter).toBeTruthy();
      expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepE`]);
      expect(spyContext).toHaveBeenCalledWith("ticketNumber", component.ticketNumber);
      expect(spyContext).toHaveBeenCalledWith("registrationDate", component.registrationDate);
    });

    it('Cuando se cierra modal no navega a stepE y no envia parámetros', () => {
      let modalOptionSelected: any = of({"close": true, "first": false, "second": false});
      const spyOpenModalSuccess = spyOn(modalService, 'openModalSuccess').and.returnValue(modalOptionSelected);
      const title = "¡Boleta de Garantía autorizada con éxito!";
      const body = "La Boleta de Garantía ya se encuentra autorizada con la firma correspondiente.";
  
      const spyContext = spyOn(contextService, 'setData');
      const spyRouter = spyOn(router, 'navigate');
  
      component.btnAutorize();
  
      expect(spyOpenModalSuccess).toBeTruthy();
      expect(spyOpenModalSuccess).toHaveBeenCalledWith(title, body, 1, ["Aceptar"], 1);
      expect(spyRouter).toHaveBeenCalledTimes(0);
      expect(spyContext).toHaveBeenCalledTimes(0)
    });
  });
  

});
