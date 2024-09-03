import { InitialConditionsInput } from "./initial-conditions";

export interface AcceptConditionsInput extends InitialConditionsInput {
    serviceCode: string;
    programCode: string;
}

export interface AcceptConditionsOutput {
    displayName: string;
    accountNumber: string;
    requirementCode: number;
    productServiceCode: number;
    transactionMeaningCode: number;
    OperationNumber: number;
    accountId: string;
}