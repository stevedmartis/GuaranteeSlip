import { Injectable } from '@angular/core';
import { IAppConfig } from '@interfaces/app-config.interface';
import { MainEnvironment } from '@models/main.environment';



declare const propertiesFrame: IAppConfig;
declare const __webpack_public_path__: any;

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  constructor() { }

  static settings: MainEnvironment;

  load() {
    const configFile = `assets/properties.js`;
    return new Promise<void>((resolve, reject) => {
      try {
        this.generateScript(configFile, resolve, reject)
      } catch (error) {
        console.log('error getting config files', error);
        reject(error);
      }
    });
  }

  private generateScript(configFile?: string, resolve?: any, reject?: any) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = configFile || `${__webpack_public_path__ || './'}assets/properties.js`;
    script.async = true;

    script.onload = () => {
      propertiesFrame.ASSETS = __webpack_public_path__ || '';
      resolve(true);
    }
    script.onerror = (error) => {
      console.log('error generateScript', error);
      if (configFile) {
        this.generateScript(undefined);
        return;
      }
      reject(error);
    }

    document.body.appendChild(script);
  }

}
