import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-term-cond-efectivo-dialog',
  templateUrl: './term-cond-efectivo-dialog.component.html',
  styleUrls: ['./term-cond-efectivo-dialog.component.scss']
})
export class TermCondEfectivoDialogComponent {

  public atBottom: boolean = false;

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    this.atBottom = element.scrollHeight === element.scrollTop + element.clientHeight;
  }

  constructor(
    public readonly dialogRef: MatDialogRef<TermCondEfectivoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
  }

  public acceptAction(): void {
    this.dialogRef.close({ action: 'accept' });
  }

  public rejectAction(): void {
    this.dialogRef.close({ action: 'reject' });
  }

  public closeAction(): void {
    this.dialogRef.close({ action: 'close' });
  }

}
