import { Component, Optional, Self, input, signal, inject, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AvatarComponent } from '../avatar/avatar.component';
import { ImageUploadService } from '../../../core/services/image-upload.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        AvatarComponent
    ],
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements ControlValueAccessor, OnInit {
    firstName = input<string>('');
    lastName = input<string>('');

    private imageUploadService = inject(ImageUploadService);
    private destroyRef = inject(DestroyRef);

    value = signal<string>('');
    disabled = signal<boolean>(false);

    onChange: (value: string) => void = () => { };
    onTouched: () => void = () => { };

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    get control(): FormControl {
        return this.ngControl?.control as FormControl;
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

    onFileSelected(event: Event): void {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;

        if (fileList && fileList.length > 0) {
            this.imageUploadService.uploadImage(fileList[0]).subscribe({
                next: (base64: string) => {
                    this.value.set(base64);
                    this.onChange(base64);
                    this.onTouched();
                    this.ngControl.control?.patchValue(base64, { emitEvent: true });
                    this.ngControl.control?.markAsDirty();
                },
                error: (err: any) => {
                    alert(err.message || 'Error uploading image');
                }
            });
        }
    }

    get errorMessage(): string {
        const control = this.ngControl?.control;
        if (!control || !control.errors || !control.touched) return '';

        const firstErrorKey = Object.keys(control.errors)[0];
        const messages = {
            required: 'Image is required',
        };
        return messages[firstErrorKey as keyof typeof messages] || 'Invalid image';
    }
}
