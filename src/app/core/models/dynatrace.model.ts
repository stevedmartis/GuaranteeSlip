export interface ActionEnterListener {
    actionId: number;
    starttime: number;
    isRootAction: boolean;
    element?: string | EventTarget;
}

export interface ActionLeaveListener {
    actionId: number;
    stoptime: number;
    isRootAction: boolean;
}

export interface APIPage {
    group: string;
    name: string;
}
export interface DtDate {
    date: Date;
}
export interface DtRumUserInput {
    info: string;
    name: string;
    target?: string | EventTarget;
    title: string;
}
export interface JavaDouble { //Value should be between range -1.7976931348623157e+308 & 1.7976931348623157e+308
    double: number;
}

export interface JavaLong { //Value should be between range -9223372036854776000 & 9223372036854776000
    long: number;
}

export type JavaLongOrObject = JavaLong | Object;
export class ShortString {
    private _short: string = "";
    private _maxLength = 100;
    constructor(value?: string) {
        this._short = (value ?? "").length > this._maxLength ? (value ?? "").substring(0,this._maxLength) : (value??"")
    }
   
    public get short(): string {
        return this._short;
    }
    public set short(value: string) {
        this._short = value.length > this._maxLength ? value.substring(0,this._maxLength) : value
    }
}

export interface Service {
    regex: RegExp;
    serviceName: string;
}