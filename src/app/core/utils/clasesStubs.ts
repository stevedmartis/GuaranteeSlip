import { from } from 'rxjs';

var result: any = [];

export class SantanderSessionServiceStub {
    person = { documentNumber: 'rut', token: 'token', email: 'email', name: 'name' }
    getProducts() { return from (result); }
    getPerson() { return this.person; }
    getSSO() { return from (result); }
}

export class LoadingServiceStub {
    showFullLoading()  { return undefined; };
    closeFullLoading()  { return undefined; };
    showModalLoading()  { return undefined; };
    closeModalLoading()  { return undefined; };

}

export class SubjectStub {
    next () { return undefined; }
}

export class MatDialogRefStub {
    open() { return undefined; };
    close() { return undefined; };
}