import { Component, Optional, Self, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ControlValueAccessor,
    NgControl,
    ReactiveFormsModule,
    FormControl
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-basic-input',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
    ],
    templateUrl: './basic-input.component.html',
    styleUrls: ['./basic-input.component.scss']
})
export class BasicInputComponent implements ControlValueAccessor {
    label = input.required<string>();
    type = input<string>('text');
    placeholder = input<string>('');
    icon = input<string>();
    hint = input<string>();
    errorMessages = input<Record<string, string>>({});
    maxLength = input<number | undefined>();

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    writeValue(value: any): void { }

    registerOnChange(fn: any): void { }

    registerOnTouched(fn: any): void { }

    setDisabledState(isDisabled: boolean): void { }

    get control(): FormControl {
        return this.ngControl?.control as FormControl;
    }

    get errorMessage(): string {
        const control = this.control;
        if (!control || !control.errors || (!control.touched && !control.dirty)) return '';

        const firstErrorKey = Object.keys(control.errors)[0];
        return this.errorMessages()[firstErrorKey] || 'Invalid field';
    }
}
