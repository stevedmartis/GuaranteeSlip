import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepEComponent } from './step-e.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SingletonModel } from '@models/singleton.model';

describe('StepEComponent', () => {
  let component: StepEComponent;
  let fixture: ComponentFixture<StepEComponent>;
  let router: Router;
  let singletonModel: SingletonModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepEComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepEComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    singletonModel = SingletonModel.getInstance();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cuando método btnRegisterAnotherBG navega al stepA y resetea data singletonModel', () => {
    const spySingleton = spyOn(SingletonModel, 'reset');
    const spyRouter = spyOn(router, 'navigate');

    component.btnRegisterAnotherBG();

    expect(spyRouter).toBeTruthy();
    expect(spyRouter).toHaveBeenCalledWith([`/boleta-garantia/stepA`]);
    expect(spySingleton).toHaveBeenCalledTimes(1);
  });
});
