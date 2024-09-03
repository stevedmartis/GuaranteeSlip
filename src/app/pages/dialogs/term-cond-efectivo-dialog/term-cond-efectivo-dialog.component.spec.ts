import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefStub } from 'src/app/core/utils/clasesStubs';

import { TermCondEfectivoDialogComponent } from './term-cond-efectivo-dialog.component';

let data: any = "test";

describe('TermCondEfectivoDialogComponent', () => {
  let component: TermCondEfectivoDialogComponent;
  let fixture: ComponentFixture<TermCondEfectivoDialogComponent>;
  let dialogRef: MatDialogRef<TermCondEfectivoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermCondEfectivoDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermCondEfectivoDialogComponent);
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
