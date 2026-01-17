import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactsStateService } from '../../core/services/contacts-state.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-contacts-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        HeaderComponent,
        LoadingSpinnerComponent,
        ContactCardComponent
    ],
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
    public contactsState = inject(ContactsStateService);
    private router = inject(Router);
    private dialog = inject(MatDialog);

    ngOnInit(): void { }

    handleInfiniteScroll(): void {
        this.contactsState.loadMore();
    }

    addContact(): void {
        this.router.navigate(['/contacts/new']);
    }

    editContact(id: string): void {
        this.router.navigate(['/contacts', id, 'edit']);
    }

    deleteContact(id: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Contact',
                message: 'Are you sure you want to delete this contact? This action cannot be undone.',
                confirmText: 'Delete',
                cancelText: 'Cancel'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.contactsState.deleteContact(id);
            }
        });
    }
}
