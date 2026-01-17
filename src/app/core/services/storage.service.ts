import { Injectable } from '@angular/core';
import { Contact } from '../../shared/models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly STORAGE_KEY = 'contacts_data';

    getContacts(): Contact[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }

    saveContacts(contacts: Contact[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    hasData(): boolean {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }

    clearContacts(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
