import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Contact } from '../../../../shared/models/contact.model';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { ContactInfoComponent } from '../../../../shared/components/contact-info/contact-info.component';
import { ContactActionsComponent } from '../../../../shared/components/contact-actions/contact-actions.component';

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
        ContactInfoComponent,
        ContactActionsComponent
    ],
    templateUrl: './contact-card.component.html',
    styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
    contact = input.required<Contact>();
    onEdit = output<string>();
    onDelete = output<string>();
}
