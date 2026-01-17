import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContactsStateService } from '../services/contacts-state.service';
import { of } from 'rxjs';

export const contactsResolver: ResolveFn<boolean> = (route, state) => {
    const contactsState = inject(ContactsStateService);

    if (contactsState.allContacts().length > 0) {
        return of(true);
    }

    contactsState.loadInitialData();
    return of(true);
};
