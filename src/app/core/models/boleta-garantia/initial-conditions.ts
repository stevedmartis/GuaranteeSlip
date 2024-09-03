export interface InitialConditionsInput {
    userId: string; // Rut usuario conectado length[10]
    customerId: string; // Rut Empresa length[10]
    contractCode: string; // length[15]
    rolCode: string; // length[2]
    action: 'A' | 'C'; // [A] Actualizar | [C] Consultar
}

export interface InitialConditionsOutput {
    resultCode: number,
    comments: string,
    flag: string
}