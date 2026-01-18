import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../models/contact.model';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';

@Component({
    selector: 'app-contact-info',
    standalone: true,
    imports: [CommonModule, MatIconModule, FullNamePipe, PhoneFormatPipe],
    templateUrl: './contact-info.component.html',
    styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
    contact = input.required<Contact>();
}
