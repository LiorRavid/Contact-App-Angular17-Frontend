import { Component, Optional, Self, input, signal, inject, DestroyRef } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

    value = signal<string>('');
    disabled = signal<boolean>(false);
    private destroyRef = inject(DestroyRef);

    onChange: (value: string) => void = () => { };
    onTouched: () => void = () => { };

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        this.ngControl.control?.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(val => {
                if (val !== this.value()) {
                    this.value.set(val || '');
                }
            });
    }

    writeValue(value: string): void {
        this.value.set(value || '');
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onInput(event: Event): void {
        const val = (event.target as HTMLInputElement).value;
        this.value.set(val);
        this.onChange(val);
        this.ngControl.control?.markAsDirty();
    }

    get control(): FormControl {
        return this.ngControl?.control as FormControl;
    }

    get errorMessage(): string {
        const control = this.control;
        if (!control || !control.errors || !control.touched) return '';

        const firstErrorKey = Object.keys(control.errors)[0];
        return this.errorMessages()[firstErrorKey] || 'Invalid field';
    }
}
