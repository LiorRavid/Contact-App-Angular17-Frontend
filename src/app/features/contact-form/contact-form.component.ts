import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ContactsStateService } from '../../core/services/contacts-state.service';
import { Contact } from '../../shared/models/contact.model';
import { CONTACT_FORM_ERROR_MESSAGES } from './constants/contact-form.constants';

import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

import { BasicInputComponent } from '../../shared/components/basic-input/basic-input.component';

import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { HasUnsavedChanges } from '../../core/guards/unsaved-changes.guard';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        AvatarComponent,
        BasicInputComponent,
        ImageUploadComponent
    ],
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, HasUnsavedChanges {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private contactsState = inject(ContactsStateService);

    // Expose constants for template
    public readonly ERROR_MESSAGES = CONTACT_FORM_ERROR_MESSAGES;

    // State using Signals
    public isEditMode = signal<boolean>(false);
    public isSubmitting = signal<boolean>(false);

    public contactForm!: FormGroup;
    private contactId: string | null = null;

    public hasUnsavedChanges(): boolean {
        return this.contactForm?.dirty && !this.isSubmitting();
    }

    ngOnInit(): void {
        this.initForm();
        this.checkEditMode();
    }

    private initForm(): void {
        this.contactForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10)]],
            cell: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(10)]],
            picture: ['']
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

                this.contactForm.markAsPristine();
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
