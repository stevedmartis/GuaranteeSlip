import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AmountPipe } from '@santander/pipes';

@Directive({
    selector: 'input[amountInputDirective]'
})
export class AmountInputDirective {

    @Input() prefix: '$ ' | 'USD ' = '$ '; // Default is $
    @Input() decimals: number = 0;
    @Input() min: number = 0;
    @Input() max: number = 10000000; // Default max value

    constructor(private el: ElementRef, private ngControl: NgControl) {
    }

    @HostListener('focus', ['$event']) onFocusChange(event: any) {
        const initialValue = this.el.nativeElement.value;

        if (this.prefix.length >= initialValue.trim().length) {
            this.el.nativeElement.value = this.prefix;
        }
    }

    @HostListener('keyup', ['$event']) onKeyupChange(event: any) {
        const initialValue = this.el.nativeElement.value;

        if (initialValue.length < this.prefix.length) {
            this.el.nativeElement.value = this.prefix;
        }
    }

    @HostListener('input', ['$event']) onInputChange(event: Event) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9.,$USD ]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

    @HostListener('blur') onBlur() {
        this.formatValue();
        this.validate();
    }

    private validate() {
        const control = this.ngControl.control;
        if (control) {
            let rawValue = this.parseValue(control.value);

            if (rawValue === null) {
                control.setErrors({ 'required': true });
            } else {
                if (rawValue < this.min || rawValue > this.max) {
                    if (rawValue < this.min) {
                        control.setErrors({ 'minAmount': true });
                    }
                    if (rawValue > this.max) {
                        control.setErrors({ 'maxAmount': true });
                    }
                } else {
                    control.setErrors(null)
                }
            }
            // control.updateValueAndValidity();
        }
    }

    private formatValue() {
        const control = this.ngControl.control;
        if (control) {
            const value = control.value;
            const rawValue = this.parseValue(value);

            if (rawValue != null) {
                control.setValue(this.getAmountFormat(rawValue), { emitEvent: false });
            }
        }
    }

    private getAmountFormat(value: number): string {
        let rawValueDecimals = value.toFixed(this.decimals);
        const amountPipe = new AmountPipe();
        let amountFormat = amountPipe.transform(rawValueDecimals, this.prefix, this.decimals);
        return `${this.prefix}${amountFormat.replace(this.prefix, '').trim()}`;
    }

    private parseValue(value: string): number | null {
        if (!value) return null;
        // Elimina el prefijo y seprador antes de convertir a número
        if (value && value.startsWith(this.prefix)) {
            return parseFloat(value.replace(this.prefix, '').replace(/\./g, '').replace(/,/g, '.'));
        }
        return parseFloat(value.replace(/\./g, '').replace(/,/g, '.'));
    }

}