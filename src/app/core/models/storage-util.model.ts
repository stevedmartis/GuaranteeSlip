
import { IInfoUserSesion } from '@interfaces/user-info.interface';
import { storages } from '../constants/storages.constants';

export class StorageUtil {
    static get token() {
        return localStorage.getItem(storages.TOKEN);
    }
    static get tokenRefresh() {
        return localStorage.getItem(storages.TOKEN_REFRESH);
    }
    static get empresaRUT() {
        return localStorage.getItem(storages.RUT_EMPRESA);
    }
    static get empresaNombre() {
        return localStorage.getItem(storages.NOM_EMPRESA);
    }
    static get rolCod() {
        return localStorage.getItem(storages.ROL_CODE);
    }
    static get contrato() {
        return localStorage.getItem(storages.CONTRATO);
    }
    static get userInfo(): IInfoUserSesion | null {

        let dataUser = localStorage.getItem(storages.USER_INFO);
        if (dataUser) {
            return JSON.parse(localStorage.getItem(storages.USER_INFO) ?? "") as IInfoUserSesion;
        } else {
            return null;
        }
    }
}
