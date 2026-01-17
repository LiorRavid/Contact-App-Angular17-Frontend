import { Routes } from '@angular/router';
import { contactsResolver } from './core/resolvers/contacts.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'contacts', pathMatch: 'full' },
    {
        path: 'contacts',
        loadComponent: () => import('./features/contacts-list/contacts-list.component').then(m => m.ContactsListComponent),
        resolve: { contacts: contactsResolver }
    }
];
