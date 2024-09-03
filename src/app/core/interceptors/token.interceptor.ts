import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageUtil } from '../models/storage-util.model';
import { MainEnvironment } from '@models/main.environment';

declare const propertiesFrame: MainEnvironment;
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const urlExcluidasToken = [
      'https://dss-ssm-enterprise-dss-pre.apps.chi01.chi.pre.cl1.paas.cloudcenter.corp/oauth/token'
    ];

    for (const url of urlExcluidasToken) {
      if (request.url.includes(url)) {
        return next.handle(request);
      }
    }

    const authToken = StorageUtil.token;
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'x-ibm-client-id': propertiesFrame.API_KEY_SECRET,
        'X-Organization-Code': 'DEFAULT-ORG',
        'X-Client-Code': 'DEFAULT-CORPORATE'
      }
    });

    return next.handle(authRequest);
  }
}
