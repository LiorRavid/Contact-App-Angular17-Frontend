import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-contact-actions',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './contact-actions.component.html',
    styleUrl: './contact-actions.component.scss'
})
export class ContactActionsComponent {
    contactId = input.required<string>();
    edit = output<string>();
    delete = output<string>();
}
