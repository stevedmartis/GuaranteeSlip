import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoletaGarantia } from '@interfaces/boleta-garantia';
import { SingletonModel } from '@models/singleton.model';
import { RutPipe } from '@santander/pipes';
import { ContextService } from '@shared/services/context.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-step-e',
  templateUrl: './step-e.component.html',
  styleUrls: ['./step-e.component.scss']
})
export class StepEComponent {

  public singletonModel: SingletonModel;
  public ticketNumber: string;
  public registrationDate: Date;

  constructor(
    private router: Router,
    private contextService: ContextService
  ) {
    this.ticketNumber = this.contextService.getData('ticketNumber');
    this.registrationDate = this.contextService.getData('registrationDate');
    this.singletonModel = SingletonModel.getInstance();
  }


  btnDownloadReceipt() {
    const data = this.mapSingletonToBoletaGarantia();
    this.generatePDF(data);
  }

  private mapSingletonToBoletaGarantia(): BoletaGarantia {
    const model = this.singletonModel;
    const rutPipe = new RutPipe();
    const rutTomador = rutPipe.transform(model.rut2);
    const beneficiarioRut = rutPipe.transform(model.rut);
    return {
      rutTomador: rutTomador,
      razonSocial: model.nombre,
      numeroBoleta: this.ticketNumber,
      montoFinanciar: model.amountField?.toString() || '',
      montoEquivalente: model.amountField?.toString() || '',
      modoFinanciamiento: model.financingModeField?.toString() || '',
      tipoBeneficiario: model.typeBeneficiaryField?.toString() || '',
      tipoMoneda: model.coinTypeField?.toString() || '',
      tipoEmision: model.typeIssueField,
      fechaRegistro: this.registrationDate.toLocaleDateString(),
      fechaVencimiento: model.expirationDateField?.toLocaleDateString() || '',
      tasaInteres: model.interestRate?.toString() + '%' || '',
      comision: model.commissionOut?.toString() || '',
      cuentaCargoComision: model.sourceAccountField,
      nombreRetira: model.nombre2,
      rutRetira: rutTomador,
      emailRetira: model.email,
      nombreBeneficiario: model.nombre,
      rutBeneficiario: beneficiarioRut,
      glosa: model.glosa,
      fechaEmision: new Date().toLocaleDateString(),
      monto: model.amountField?.toString() || '',
      moneda: model.coinTypeField?.toString() || '',
      iva: model.ivaOut?.toString() || '',
      total: model.amountTotalOut?.toString() || '',
      numeroCuenta: model.sourceAccountField,
      tomadorNombre: model.nombre,
      tomadorRut: model.rut,
      beneficiarioNombre: model.nombre,
      beneficiarioRut: beneficiarioRut
    };
  }

  generatePDF(data: BoletaGarantia) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    // Función para añadir imágenes
    function addImage(url: string, x: number, y: number, width: number) {
      doc.addImage(url, 'PNG', x, y, width, width * 0.3);
    }
  
    // Añadir logos
    addImage('assets/images/logo-santander.png', 10, 10, 50);
    addImage('assets/images/logo-santander.png', pageWidth - 60, 10, 50);
  
    // Función para dibujar línea
    function drawLine(y: number) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(10, y, pageWidth - 10, y);
    }
  
    // Función para crear subtítulo con fondo gris
    function createSubtitle(text: string, rightText: string, y: number): number {
      doc.setFillColor(240, 240, 240); // Color gris claro
      doc.rect(10, y - 5, pageWidth - 20, 10, 'F');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0);
      doc.text(text, 15, y + 2);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(rightText, pageWidth - 15, y + 2, { align: 'right' });
      return y + 10;
    }
  
    drawLine(30);
  
    // Título y fecha de emisión
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Datos de Boleta de Garantía', 10, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de emisión: ${data.fechaEmision}`, pageWidth - 10, 40, { align: 'right' });
  
    // Subtítulo Detalles y N° Boleta
    let yPos = createSubtitle('Detalles', `N° Boleta: ${data.numeroBoleta}`, 50);
  
    // Función para crear filas de datos en dos columnas
    function createDataRow(leftKey: string, leftValue: string, rightKey: string, rightValue: string, y: number, drawBottomLine: boolean = true) {
      const midPoint = pageWidth / 2 - 5;
      
      doc.setFont('helvetica', 'bold');
      doc.text(leftKey, 10, y);
      doc.text(rightKey, midPoint, y);
      
      doc.setFont('helvetica', 'normal');
      doc.text(leftValue, 10, y + 5);
      doc.text(rightValue, midPoint, y + 5);
      
      if (drawBottomLine) {
        drawLine(y + 7);
      }
      return y + 12; // Retorna la siguiente posición Y
    }
  
    // Detalles en dos columnas
    yPos += 5;
    const details = [
      ['Nombre de empresa', data.razonSocial, 'RUT', data.rutTomador],
      ['Monto a financiar', data.montoFinanciar, 'Modo de financiamiento', data.modoFinanciamiento],
      ['Tipo de Beneficiario', data.tipoBeneficiario, 'Tipo de moneda', data.tipoMoneda],
      ['Tipo de emisión', data.tipoEmision, 'Fecha de registro', data.fechaRegistro],
      ['Fecha de vencimiento', data.fechaVencimiento, 'Tasa de interés', data.tasaInteres],
      ['Comisión', data.comision, 'Cuenta cargo de comisión', data.cuentaCargoComision]
    ];
  
    details.forEach(([leftKey, leftValue, rightKey, rightValue]) => {
      yPos = createDataRow(leftKey, leftValue, rightKey, rightValue, yPos);
    });
  
    // Datos del Beneficiario
    yPos += 5;
    yPos = createSubtitle('Datos del Beneficiario', '', yPos);
    yPos += 5;
  
    yPos = createDataRow('Nombre', data.nombreBeneficiario, 'RUT', data.rutBeneficiario, yPos);
    yPos = createDataRow('Glosa', data.glosa, '', '', yPos, false); // Sin línea divisora
  
    // Datos de quien retira la Boleta de Garantía
    yPos += 10;
    yPos = createSubtitle('Datos de quien retira la Boleta de Garantía', '', yPos);
    yPos += 5;
  
    yPos = createDataRow('Nombre', data.nombreRetira, 'RUT', data.rutRetira, yPos);
    yPos = createDataRow('Mail', data.emailRetira, '', '', yPos);
  
    // Pie de página
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const footerText = [
      'Información provisoria sujeta a confirmación por parte del Banco.',
      'Infórmese sobre la garantía estatal de los depósitos en su banco o en www.cmfchile.cl.',
      'NO OLVIDE IMPRIMIR Y PRESENTAR POR CAJA ESTE DOCUMENTO.'
    ];
    footerText.forEach((line, index) => {
      doc.text(line, pageWidth / 2, pageHeight - 20 + (index * 5), { align: 'center' });
    });
  
    // Guardar el PDF
    doc.save('Boleta_de_Garantia.pdf');
  }

  public btnRegisterAnotherBG() {
    SingletonModel.reset();
    this.router.navigate([`/boleta-garantia/stepA`]);
  }

}
