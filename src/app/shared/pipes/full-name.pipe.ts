import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
    name: 'fullName',
    standalone: true
})
export class FullNamePipe implements PipeTransform {
    transform(contact: Contact | undefined): string {
        if (!contact) return '';
        return `${contact.firstName} ${contact.lastName}`;
    }
}
