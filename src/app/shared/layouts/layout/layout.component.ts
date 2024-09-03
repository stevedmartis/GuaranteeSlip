import { Component,Input } from '@angular/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() currentNavStringTitles:string[]=[];
}
