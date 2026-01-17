import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Contact } from '../../../../shared/models/contact.model';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { FullNamePipe } from '../../../../shared/pipes/full-name.pipe';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';

@Component({
    selector: 'app-contact-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        AvatarComponent,
        FullNamePipe,
        PhoneFormatPipe
    ],
    templateUrl: './contact-card.component.html',
    styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
    @Input({ required: true }) contact!: Contact;
    @Output() onEdit = new EventEmitter<string>();
    @Output() onDelete = new EventEmitter<string>();
}
