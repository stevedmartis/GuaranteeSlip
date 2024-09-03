import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MainEnvironment } from "@models/main.environment";
import { catchError, Observable, throwError } from "rxjs";
import { 
    InitialConditionsInput, 
    AcceptConditionsInput
} from "@models/boleta-garantia/index";

declare const propertiesFrame: MainEnvironment;

@Injectable({
    providedIn: 'root',
})
export class BoletaGarantiaService {

    constructor(private readonly http: HttpClient) { }

    initialConditions(initialConditions: InitialConditionsInput): Observable<any> {
        return this.http.post(`${propertiesFrame.INITIAL_CONDITIONS}`, initialConditions)
            .pipe(catchError(error => {
                return throwError(() => error);
            }));
    }

    acceptConditions(acceptConditions: AcceptConditionsInput): Observable<any> {
        return this.http.post(`${propertiesFrame.ACCEPT_CONDITIONS}`, acceptConditions)
            .pipe(catchError(error => {
                return throwError(() => error);
            }));
    }

}