import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MainEnvironment } from "@models/main.environment";
import { ContextModel } from "@shared/models/context.model";
import { BehaviorSubject, Observable, tap } from "rxjs";

declare const propertiesFrame: MainEnvironment;

@Injectable({
    providedIn: 'root',
})
export class UserContextService {
    private userContextDataSubject = new BehaviorSubject<ContextModel | any>(null) ;

    constructor(private http: HttpClient) {
    }

    public refresh(): Observable<ContextModel> {
        return this.http.get<ContextModel>(propertiesFrame.CONTEXT_SERVICE_URL).pipe(
            tap((response) => {
                this.userContextDataSubject.next(response);
            })
        );
    }

    public getObservable(): Observable<ContextModel> {
        return this.userContextDataSubject.asObservable();
    }

    public getCurrentValue(): ContextModel {
        return this.userContextDataSubject.getValue();
    }
}