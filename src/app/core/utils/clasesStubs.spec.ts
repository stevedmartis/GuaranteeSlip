import { TestBed } from '@angular/core/testing';
import { SantanderSessionServiceStub, LoadingServiceStub, SubjectStub, MatDialogRefStub } from './clasesStubs';

describe('clasStub', () =>{
    let santanderSessionServiceStub: SantanderSessionServiceStub;
    let loadingServiceStub: LoadingServiceStub;
    let subjStub: SubjectStub;
    let matDialogRefStub: MatDialogRefStub;

    beforeEach(() =>{
        TestBed.configureTestingModule({
            providers: [
                SantanderSessionServiceStub,
                LoadingServiceStub,
                SubjectStub,
                MatDialogRefStub
            ]
        });
        santanderSessionServiceStub = TestBed.inject(SantanderSessionServiceStub);
        loadingServiceStub = TestBed.inject(LoadingServiceStub);
        subjStub = TestBed.inject(SubjectStub);
        matDialogRefStub = TestBed.inject(MatDialogRefStub);
    });
    it('testing stubs', ()=>{
        expect(santanderSessionServiceStub.getProducts()).toBeTruthy();
        expect(santanderSessionServiceStub.getSSO()).toBeTruthy();
        expect(loadingServiceStub.showFullLoading()).toBeFalsy();
        expect(loadingServiceStub.closeFullLoading()).toBeFalsy();
        expect(loadingServiceStub.showModalLoading()).toBeFalsy();
        expect(loadingServiceStub.closeModalLoading()).toBeFalsy();
        expect(subjStub.next()).toBeFalsy();
        expect(matDialogRefStub.open()).toBeFalsy();
        expect(matDialogRefStub.close()).toBeFalsy();
    });
});