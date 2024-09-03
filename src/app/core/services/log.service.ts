import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _logLevel: number;

  constructor() {
    this._logLevel =  6; // Si no es posible obtener el log lever, default a 6 u off.
  }

  private _shouldLog(level: number): boolean {
    if ((level >= this._logLevel && level !== 6) || this._logLevel === 0) return true;
    return false;
  }

  private _getDate(): string {
    let date = new Date();
    let month = new Intl.DateTimeFormat('es', { month: 'short' }).format(date);
    let day = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(date);
    let timestamp = (date.getHours() < 10 ? '0' : '') + "" + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + "" + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + "" + date.getSeconds() + ":" + (date.getSeconds() < 10 ? '0' : '') + "" + date.getSeconds();
    const formatedDate = ` ng-fob | ${month} ${day} | ${timestamp}`
    return formatedDate;
  }

  private _writeToLog(msg: string, level: number, params: any[]) {

    const levels = ["ALL", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "OFF"];
    const dateStyle = "background:#111827; font-weight:bold; font:serif; color:#b91c1c";
    let typeStyle = 'background:#0ea5e9; font-weight:bold; color:#0c4a6e';
    const messageStyle = 'background:transparent;';
    const extraInfoStyle = "padding: 2px; border-radius: 6px; background:#8a0305; display:block; with: 100%; font-weight:bold; font:serif";

    switch (level) {
      case 1:
        typeStyle = 'background:#71717a; font-weight:bold; color:#18181b';
        break;
      case 2:
        typeStyle = 'background:#0ea5e9; font-weight:bold; color:#0c4a6e';
        break;
      case 3:
        typeStyle = 'background:#f59e0b; font-weight:bold; color:#7c2d12';
        break;
      case 4:
        typeStyle = 'background:#dc2626; font-weight:bold; color:#7f1d1d';
        break;
      default:
        typeStyle = 'background:#0ea5e9; font-weight:bold; color:#0c4a6e';
    }

    if (this._shouldLog(level)) {
      let date: string = "%c" + this._getDate();
      let type: string = "%c " + levels[level] + " ";
      let message: string = "%c " + msg.toString();

      let fullLog: string = date + " " + type + " " + message;

      console.log(fullLog, dateStyle, typeStyle, messageStyle);
      if (params.length) {
        console.log(date + "   ⮑ extra info    ", extraInfoStyle);
        console.log("%c " + JSON.stringify(params, null, 2), 'background:#000408; color:#3ECD58');
      }
    }
  }

  public debug(message: string, ...params: any[]): void {
    this._writeToLog(message, 1, params);
  }

  public info(message: string, ...params: any[]): void {
    this._writeToLog(message, 2, params);
  }

  public warn(message: string, ...params: any[]): void {
    this._writeToLog(message, 3, params);
  }

  public error(message: string, ...params: any[]): void {
    this._writeToLog(message, 4, params);
  }

  public fatal(message: string, ...params: any[]): void {
    this._writeToLog(message, 5, params);
  }

  public log(message: string) {
    this._writeToLog(message, 1, [])
  }
  
}
