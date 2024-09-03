import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalsModule } from '@santander/modals';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@santander/http';

import { AppConfig } from '@services/AppConfig/app-config.service';
import { DynatraceInterceptor } from './core/interceptors/dynatrace.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ModalsModule
  ],
  providers: [
    AppConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DynatraceInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
