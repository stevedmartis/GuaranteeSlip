import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StepBComponent } from "./step-b.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RutPipe } from "@santander/pipes";
import { LoadingService } from "@santander/loading";
import { Router } from "@angular/router";

describe('StepBComponent', () => {
  let component: StepBComponent;
  let fixture: ComponentFixture<StepBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepBComponent, RutPipe ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LoadingService, useValue: {} },
        { provide: Router, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});