import { Injectable, computed, signal } from '@angular/core';
import { Contact } from '../../shared/models/contact.model';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { Observable, catchError, finalize, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactsStateService {
    private contacts = signal<Contact[]>([]);
    private searchTerm = signal<string>('');
    private loading = signal<boolean>(false);
    private error = signal<string | null>(null);

    readonly allContacts = this.contacts.asReadonly();
    readonly isLoading = this.loading.asReadonly();
    readonly currentSearchTerm = this.searchTerm.asReadonly();
    readonly currentError = this.error.asReadonly();

    readonly filteredContacts = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term) return this.contacts();

        return this.contacts().filter(c =>
            c.firstName.toLowerCase().includes(term) ||
            c.lastName.toLowerCase().includes(term) ||
            c.phone.includes(term) ||
            c.cell.includes(term) ||
            c.email.toLowerCase().includes(term)
        );
    });

    constructor(
        private storageService: StorageService,
        private apiService: ApiService
    ) { }

    loadInitialData(): Observable<Contact[] | boolean> {
        if (this.storageService.hasData()) {
            this.contacts.set(this.storageService.getContacts());
            return of(true);
        }

        this.loading.set(true);
        this.error.set(null);

        return this.apiService.fetchContacts(50).pipe(
            tap(contacts => {
                this.contacts.set(contacts);
                this.storageService.saveContacts(contacts);
            }),
            catchError(err => {
                this.error.set('Failed to load contacts. Please try again later.');
                return of([]);
            }),
            finalize(() => this.loading.set(false))
        );
    }

    setSearchTerm(term: string) {
        this.searchTerm.set(term);
    }

    addContact(contact: Contact) {
        const updated = [contact, ...this.contacts()];
        this.updateStateAndStorage(updated);
    }

    updateContact(updatedContact: Contact) {
        const updated = this.contacts().map(c =>
            c.id === updatedContact.id ? updatedContact : c
        );
        this.updateStateAndStorage(updated);
    }

    deleteContact(id: string) {
        const updated = this.contacts().filter(c => c.id !== id);
        this.updateStateAndStorage(updated);
    }

    getContactById(id: string): Contact | undefined {
        return this.contacts().find(c => c.id === id);
    }

    private updateStateAndStorage(updated: Contact[]) {
        this.contacts.set(updated);
        this.storageService.saveContacts(updated);
    }
}
