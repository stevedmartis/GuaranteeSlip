import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContextService {
    private data: { [s: string]: any } = {};

    constructor() { }

    public setData(name: string, data: any): void {
        this.data[name] = data;
    }

    public getData(name: string): any {
        return this.data[name];
    }

}