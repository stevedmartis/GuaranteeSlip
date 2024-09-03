import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';


@Injectable({
  providedIn: 'root'
})
export class CustomDateAdapter extends NativeDateAdapter {

  constructor(platform: Platform) {
    super('es-ES', platform);
  }
  private _to2digit(n: number): string {
    return ('00' + n).slice(-2);
  }

  getFirstDayOfWeek(): number {
    return 1;
  }

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'dd/MM/yyyy') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${this._to2digit(day)}/${this._to2digit(month)}/${year}`;
    } else if (displayFormat === 'D de MMMM YYYY') {
      const months = this.getMonthNames('long');
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} de ${month} ${year}`;
    } else {
      const month = date.toLocaleString('es-ES', { month: 'long' });
      const year = date.getFullYear();
      return `${month} ${year}`;
    }
  }

  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1) && value.length == 10) {
      const str = value.split('/');
      const date = Number(str[0]);
      const month = Number(str[1]) - 1;
      const year = Number(str[2]);
      
      return new Date(year, month, date);
    } else {
      return null;
    }
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    }
    if (style === 'short') {
      return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    }
    if (style === 'narrow') {
      return ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    }
    return super.getMonthNames(style);
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    }
    if (style === 'short') {
      return ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    }
    if (style === 'narrow') {
      return ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    }
    return super.getDayOfWeekNames(style);
  }
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    // dateInput: 'D de MMMM YYYY',
    monthYearLabel: { month: 'long', year: 'numeric' },
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
}
