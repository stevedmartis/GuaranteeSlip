import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefStub } from 'src/app/core/utils/clasesStubs';

import { TermCondContralineaDialogComponent } from './term-cond-contralinea-dialog.component';

let data: any = "test";

describe('TermCondContralineaDialogComponent', () => {
  let component: TermCondContralineaDialogComponent;
  let fixture: ComponentFixture<TermCondContralineaDialogComponent>;
  let dialogRef: MatDialogRef<TermCondContralineaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermCondContralineaDialogComponent ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermCondContralineaDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cuando acceptAction cierra modal y retorna action = accept', () => {
    let spyFnc = spyOn(dialogRef, 'close');
    component.acceptAction();
    expect(spyFnc).toHaveBeenCalledTimes(1);
    expect(spyFnc).toHaveBeenCalledWith({action: 'accept'});
  });

  it('Cuando closeAction cierra modal y retorna action = reject', () => {
    let spyFnc = spyOn(dialogRef, 'close');
    component.rejectAction();
    expect(spyFnc).toHaveBeenCalledTimes(1);
    expect(spyFnc).toHaveBeenCalledWith({action: 'reject'});
  });

  it('Cuando closeAction cierra modal y retorna action = close', () => {
    let spyFnc = spyOn(dialogRef, 'close');
    component.closeAction();
    expect(spyFnc).toHaveBeenCalledTimes(1);
    expect(spyFnc).toHaveBeenCalledWith({action: 'close'});
  });
  
});
