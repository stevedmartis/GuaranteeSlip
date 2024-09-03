import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


import { catchError, finalize, tap } from 'rxjs/operators';
import { Service } from '@models/dynatrace.model';
import { DynatraceService } from '@services/dynatrace/dynatrace.service';
import { LogService } from '@services/log.service';


@Injectable()
export class DynatraceInterceptor implements HttpInterceptor {
  private hoy = { date: new Date() };

  private serviceDictionary: Service[] = [
    {
      regex: /^https?:\/\/.+\/corporate_current_account\/reconciliation_records\/v1\/accounts\/settlements\/download\?operation=XSLTXT&date=\w+$/,
      serviceName: 'EXmple Url TXT'
    },
    {
        regex: /^https?:\/\/run\.mocky\.io\/v3\/e34a2665-0d62-4f62-9e9c-392e906ad30c$/,
        serviceName: 'Mock User Data Service'
      }
  ];

  constructor(
    private _dynaService: DynatraceService,
    private _log: LogService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Dynatrace Interceptando petición:', request.url);
    const requestUrl = request.url;
    const truncatedUrl =
      requestUrl.length > 99 ? requestUrl.substring(0, 99) : requestUrl;

    let serviceName = this.matchService(requestUrl, this.serviceDictionary);
    if (serviceName == '') {
      this._log.warn(
        'Dynatrace Interceptor - no match for service: ' + requestUrl
      );
      serviceName = request.url;
    }

    let actionId = 0;
    try {
      this._dynaService
        .enterAction(
          'BACKEND: ' + serviceName,
          undefined,
          undefined,
          requestUrl
        )
        .then((id) => (actionId = id));
    } catch {
      this._log.warn(
        'Dynatrace interceptor: No se pudo competar acción: ' + serviceName
      );
    }

    return next.handle(request).pipe(
      tap((event) => {
      console.log('Interceptor: evento de respuesta', event);
        if (
          event instanceof HttpResponse &&
          event.status >= 200 &&
          event.status < 300
        ) {
          this.tagOK(actionId);
        }
      })
      ,
      catchError((error) => {
        this._log.error('Dynatrace Interceptor: error', error.error);
        const long = { long_one: actionId ?? 1 };
        const double = { double: actionId ?? 1 };
        if (error instanceof HttpErrorResponse) {
          this.tagError(actionId, error, serviceName, truncatedUrl);
        }
        return throwError(error);
      }),
      finalize(() => {
        try {
          this._dynaService.leaveAction(actionId);
        } catch {
          this._log.warn(
            'Dynatrace interceptor: No se pudo competar leaveAction'
          );
        }
      })
    );
  }

  tagOK(actionId: number) {
    let evento_informativo = { evento_informativo: 'Operacion Exitosa' };
    const long = { long_one: actionId ?? 1 };
    try {
      this._dynaService.addActionProperties(
        actionId,
        long,
        this.hoy,
        evento_informativo,
        evento_informativo
      );
    } catch {
      this._log.warn(
        'Dynatrace interceptor: No se pudo competar addActionProperties'
      );
    }
  }

  tagError(
    actionId: number,
    errorResponse: HttpErrorResponse,
    serviceName: string,
    truncatedUrl: string
  ) {
    const long = { long_one: actionId ?? 1 };

    const error = errorResponse.error;
    this._log.info('Dynatrace tagError error', error);

    let shortError = `Servicio ${serviceName}- Error ${error?.code ?? '0'}: ${
      error?.message ?? ''
    } ${error?.responseMessage ?? ''} ${
      error?.errors instanceof Array ? error.errors[0]?.message : ''
    }`.substring(0, 84);
    this._log.error('dynatrace interceptor shortError', shortError);
    let evento_error = { evento_error: shortError };

    try {
      this._log.warn(
        'Dynatrace action: ' + actionId + ' - Evento error: ' + evento_error
      );
      this._dynaService.addActionProperties(
        actionId,
        long,
        this.hoy,
        evento_error,
        evento_error
      );
      // this._dynaService.markXHRFailed(Number(error.status) , error.message, this.action)
      this._dynaService.reportCustomError(
        'Evento_Error ',
        shortError,
        truncatedUrl,
        actionId
      );
    } catch {
      this._log.warn('Dynatrace interceptor: No se pudo competar tagError');
    }
  }

  matchService(url: string, services: Service[]): string {
    for (const service of services) {
      if (url.match(service.regex)) {
        return service.serviceName;
      }
    }
    return '';
  }
}
