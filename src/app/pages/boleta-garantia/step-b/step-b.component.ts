import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SingletonModel } from 'src/app/core/models/singleton.model';
import { LoadingService } from '@santander/loading';
import { Router } from '@angular/router';
import { RutPipe } from '@santander/pipes';
import {RutValidator} from "@santander/validators";
import { TypeMessage } from '@santander/contextual-message';
import { ContextService } from '@shared/services/context.service';

@Component({
  selector: 'app-step-b',
  templateUrl: './step-b.component.html',
  styleUrls: ['./step-b.component.scss', '../../../../assets/scss/extension.compatibility.scss']
})
export class StepBComponent implements AfterViewInit {

  public singletonModel: SingletonModel;
  public simulacionForm: FormGroup | any;
  public isSimulated: boolean = false;
  public informativeMessageType = TypeMessage.INFORMATIVE;
  private emailRegex: string = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  public dataEdit: boolean = false;

  constructor(private fb: FormBuilder, private readonly loadingService: LoadingService, private router: Router, private contextService: ContextService) {
    this.dataEdit = this.contextService.getData('dataEdit');
    this.singletonModel = SingletonModel.getInstance();

    this.simulacionForm = this.fb.group({
      nombre:[this.singletonModel.nombre, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      rut: ['', [Validators.required, RutValidator.isValid, Validators.maxLength(9)]],
      glosa: [this.singletonModel.glosa, [Validators.required, Validators.maxLength(500), this.forbiddenWordsValidator(['mutuo', 'préstamo', 'empréstito', 'financiación', 'financiamiento', 'deuda'])]],
      nombre2:[this.singletonModel.nombre2, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      rut2: ['', [Validators.required, RutValidator.isValid, Validators.maxLength(9)]],
      email: [this.singletonModel.email, [Validators.required, Validators.pattern(this.emailRegex)]]
    }, { validators: this.rutsDiferentesValidator() });

    if (this.dataEdit) {
      this.simulacionForm.get('nombre').disable();
      this.simulacionForm.get('rut').disable();
      this.simulacionForm.get('email').disable();
    }

    this.simulacionForm.get('rut').valueChanges.subscribe(() => {
      this.simulacionForm.updateValueAndValidity();
    });
    this.simulacionForm.get('rut2').valueChanges.subscribe(() => {
      this.simulacionForm.updateValueAndValidity();
    });
    
    this.simulacionForm.statusChanges.subscribe((status: any) => {
      const submitButton = document.querySelector('.button-row button[type="submit"]');
      console.log( this.simulacionForm.get('rut'))
      if (submitButton) {
        if (status === 'VALID') {
          submitButton.removeAttribute('disabled');
        } else {
          submitButton.setAttribute('disabled', 'true');
        }
      }
    });
  }

  rutsDiferentesValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const rut1Control = formGroup.get('rut');
      const rut2Control = formGroup.get('rut2');
  
      if (rut1Control && rut2Control) {
        const rut1 = this.cleanRut(rut1Control.value);
        const rut2 = this.cleanRut(rut2Control.value);
  
        if (rut1 && rut2 && rut1 === rut2) {
          rut2Control.setErrors({ rutsDuplicados: true });
          return { rutsDuplicados: true };
        } else {
          // Limpiar el error si ya no están duplicados
          const errors = rut2Control.errors;
          if (errors) {
            delete errors['rutsDuplicados'];
            rut2Control.setErrors(Object.keys(errors).length ? errors : null);
          }
        }
      }
      return null;
    };
  }

  private cleanRut(rut: string): string {
    return rut ? rut.replace(/\./g, '').replace('-', '').trim().toLowerCase() : '';
  }

  ngAfterViewInit(): void {
    console.log('this.singletonModel.rut', this.singletonModel.rut)
    const rutPipe = new RutPipe();
    if (this.singletonModel.rut) {
      const rutClient = rutPipe.transform(this.singletonModel.rut);
      this.simulacionForm.get('rut')?.setValue(rutClient);
    }
  
    if (this.singletonModel.rut2) {
      const rutClient2 = rutPipe.transform(this.singletonModel.rut2);
      this.simulacionForm.get('rut2')?.setValue(rutClient2);
    }

  }


  forbiddenWordsValidator(forbiddenWords: string[]): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      // Normaliza el texto a minúsculas y elimina acentos
      const normalizeText = (text: string) => {
        return text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      };

      const normalizedValue = normalizeText(control.value);

      const hasForbiddenWords = forbiddenWords.some(word => {
        const normalizedWord = normalizeText(word);
        return normalizedValue.includes(normalizedWord);
      });

      return hasForbiddenWords ? { forbiddenWords: { value: control.value } } : null;
    };
  }
  public btnContinue() {
    if (this.dataEdit) {
      this.router.navigate([`/boleta-garantia/stepD`]);
    } else {
      this.router.navigate([`/boleta-garantia/stepC`]);
    }
  }

  public async btnSimular(formulario: FormGroup) {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.singletonModel.nombre = this.simulacionForm.get('nombre').value;
    this.singletonModel.rut = this.simulacionForm.get('rut').value;
    this.singletonModel.nombre2 = this.simulacionForm.get('nombre2').value;
    this.singletonModel.glosa = this.simulacionForm.get('glosa').value;
    this.singletonModel.rut2 = this.simulacionForm.get('rut2').value;
    this.singletonModel.email = this.simulacionForm.get('email').value;

    console.log("singletonModel:", this.singletonModel);

    this.singletonModel.stepBFormIsValid = true;
    this.btnContinue();
    this.isSimulated = true;
    this.simulacionForm.disable();
    this.loadingService.closeFullLoading();
  }

  private timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  public btnGoBack() {
    this.router.navigate([`/boleta-garantia/stepA`]);
 
  }
}
