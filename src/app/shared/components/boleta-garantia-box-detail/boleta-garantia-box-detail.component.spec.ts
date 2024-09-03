import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaGarantiaBoxDetailComponent } from './boleta-garantia-box-detail.component';
import { PipesModule } from '@santander/pipes';
import { AccountObPipe } from 'src/app/core/pipes/account-ob.pipe';

describe('BoletaGarantiaBoxDetailComponent', () => {
  let component: BoletaGarantiaBoxDetailComponent;
  let fixture: ComponentFixture<BoletaGarantiaBoxDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoletaGarantiaBoxDetailComponent, AccountObPipe ],
      imports: [
        PipesModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaGarantiaBoxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
