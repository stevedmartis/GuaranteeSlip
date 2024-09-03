import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfig } from '@services/AppConfig/app-config.service';

if (environment.production) {
  enableProdMode();
}

const appConfig: AppConfig = new AppConfig();

appConfig.load().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}).catch(err => alert('no es posible configurar la app'));

