export interface BoletaGarantia {
  // Campos originales
  rutTomador: string;
  razonSocial: string;
  numeroBoleta: string;
  montoFinanciar: string;
  modoFinanciamiento: string;
  tipoBeneficiario: string;
  tipoMoneda: string;
  tipoEmision: string;
  fechaRegistro: string;
  fechaVencimiento: string;
  tasaInteres: string;
  comision: string;
  cuentaCargoComision: string;
  nombreRetira: string;
  rutRetira: string;
  emailRetira: string;
  nombreBeneficiario: string;
  rutBeneficiario: string;
  glosa: string;

  // Campos adicionales
  fechaEmision: string;
  monto: string;
  moneda: string;
  iva: string;
  total: string;
  numeroCuenta: string;
  tomadorNombre: string;
  tomadorRut: string;
  beneficiarioNombre: string;
  beneficiarioRut: string;

  // Nuevo campo
  montoEquivalente: string;
}