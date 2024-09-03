import { PerfilName, FinancingMode, CoinType, BeneficiaryType } from 'src/app/core/enums';
import { BoletaGarantiaConstants } from '../constants/boleta-garantia.constants';

export class SingletonModel {
    private static instance: SingletonModel;
    private _FinancingMode = FinancingMode;

    public perfil: PerfilName | undefined;
    
    // ******** StepA ******** //
    // Format Amount
    public amountPrefix: '$ ' | 'USD ' = '$ ';
    public amountDivisaFormat: 'CLP' | 'USD' = 'CLP';
    public amountDecimals: number = 0;
    // Inputs
    public financingModeField: FinancingMode | undefined;
    public typeBeneficiaryField: BeneficiaryType | undefined;
    public coinTypeField: CoinType | undefined;
    public sourceAccountField: string = "";
    public amountField: number | undefined;
    public typeIssueField: string = ""; // Tipo de emisión
    public expirationDateField: Date | undefined;

    // Outputs
    public interestRate: number | undefined;
    public commissionOut: number | undefined;
    public ivaOut: number | undefined;
    public amountTotalOut: number | undefined;


    // StepB
    // Inputs
    public nombre:  string = "";
    public rut: string = '';
    public nombre2:  string = "";
    public glosa:  string = "";
    public rut2:  string = '';
    public email:  string = "";

    //formStepBValid
    public stepBFormIsValid:  boolean = false;

    private constructor() {
    }

    public static getInstance(): SingletonModel {
        if (!SingletonModel.instance) {
            SingletonModel.instance = new SingletonModel();
            this.initialLoad(SingletonModel.instance);
        }
        return SingletonModel.instance;
    }

    private static initialLoad(instance: SingletonModel): void {
        
    }

    public get serviceCode(): string {
        if (!this.financingModeField) {
            return ''
        }

        if (this.financingModeField == this._FinancingMode.CONTRALINEA) {
            return BoletaGarantiaConstants.CREATION_SERVICE_CODE_CON_FINANCIAMIENTO;
        } else if (this.financingModeField == this._FinancingMode.EFECTIVO) {
            return BoletaGarantiaConstants.CREATION_SERVICE_CODE_EFECTIVO;
        } else {
            return '';
        }
    }

    public get programCode(): string {
        if (!this.financingModeField) {
            return ''
        }

        if (this.financingModeField == this._FinancingMode.CONTRALINEA) {
            return BoletaGarantiaConstants.CREATION_PROGRAM_CODE_CON_FINANCIAMIENTO;
        } else if (this.financingModeField == this._FinancingMode.EFECTIVO) {
            return BoletaGarantiaConstants.CREATION_PROGRAM_CODE_EFECTIVO;
        } else {
            return '';
        }
    }

    public setAmountFormat(prefix: '$ ' | 'USD ', divisa: 'CLP' | 'USD', decimals: number = 0) {
        this.amountPrefix = prefix;
        this.amountDivisaFormat = divisa;
        this.amountDecimals = decimals;
    }

    public resetDataStepA() {
        // Inputs
        this.financingModeField = undefined;
        this.typeBeneficiaryField = undefined;
        this.coinTypeField = undefined;
        this.sourceAccountField = "";
        this.amountField = undefined;
        this.typeIssueField = "";
        this.expirationDateField = undefined;

        // Outputs
        this.interestRate = undefined;
        this.commissionOut = undefined;
        this.ivaOut = undefined;
        this.amountTotalOut = undefined;
    }

    public static reset() {
        SingletonModel.instance = new SingletonModel();
        this.initialLoad(SingletonModel.instance);
    }
    
}
