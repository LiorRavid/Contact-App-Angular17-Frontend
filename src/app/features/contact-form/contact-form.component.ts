import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ContactsStateService } from '../../core/services/contacts-state.service';
import { Contact } from '../../shared/models/contact.model';
import { ContactFormModel } from './models/contact-form.model';
import { CONTACT_FORM_ERROR_MESSAGES } from './constants/contact-form.constants';
import { ImageUploadService } from '../../core/services/image-upload.service';

import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        AvatarComponent
    ],
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private contactsState = inject(ContactsStateService);

    // State using Signals
    public isEditMode = signal<boolean>(false);
    public isSubmitting = signal<boolean>(false);

    public contactForm!: FormGroup<ContactFormModel>;
    private contactId: string | null = null;

    ngOnInit(): void {
        this.initForm();
        this.checkEditMode();
    }

    private initForm(): void {
        this.contactForm = this.fb.group<ContactFormModel>({
            firstName: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
            lastName: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
            email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
            phone: this.fb.control('', {
                validators: [Validators.required, Validators.pattern(/^[0-9-+() ]*$/)],
                nonNullable: true
            }),
            cell: this.fb.control(''),
            picture: this.fb.control('')
        });
    }

    private checkEditMode(): void {
        this.contactId = this.route.snapshot.paramMap.get('id');
        if (this.contactId) {
            this.isEditMode.set(true);
            const contact = this.contactsState.getContactById(this.contactId);
            if (contact) {
                this.contactForm.patchValue(contact);
            } else {
                this.router.navigate(['/contacts']);
            }
        }
    }

    public getErrorMessage(controlName: string): string {
        const control = this.contactForm.get(controlName);
        if (!control || !control.errors) return '';

        const firstErrorKey = Object.keys(control.errors)[0];
        return CONTACT_FORM_ERROR_MESSAGES[controlName]?.[firstErrorKey] || 'Invalid field';
    }

    private imageUploadService = inject(ImageUploadService);

    public onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.imageUploadService.uploadImage(input.files[0]).subscribe({
                next: (base64: string) => {
                    this.contactForm.patchValue({ picture: base64 });
                },
                error: (err: Error) => {
                    alert(err.message);
                }
            });
        }
    }

    onSubmit(): void {
        if (this.contactForm.valid) {
            this.isSubmitting.set(true);
            const contactData = this.contactForm.getRawValue();

            try {
                const contactToSave: Contact = {
                    ...contactData,
                    id: this.isEditMode() && this.contactId ? this.contactId : crypto.randomUUID()
                } as Contact;

                if (this.isEditMode()) {
                    this.contactsState.updateContact(contactToSave);
                } else {
                    this.contactsState.addContact(contactToSave);
                }
                this.router.navigate(['/contacts']);
            } finally {
                this.isSubmitting.set(false);
            }
        }
    }

    onCancel(): void {
        this.router.navigate(['/contacts']);
    }
}
