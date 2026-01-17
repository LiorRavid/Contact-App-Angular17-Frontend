import { Routes } from '@angular/router';
import { contactsResolver } from './core/resolvers/contacts.resolver';

import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'contacts', pathMatch: 'full' },
    {
        path: 'contacts',
        loadComponent: () => import('./features/contacts-list/contacts-list.component').then(m => m.ContactsListComponent),
        resolve: { contacts: contactsResolver }
    },
    {
        path: 'contacts/new',
        loadComponent: () => import('./features/contact-form/contact-form.component').then(m => m.ContactFormComponent),
        canDeactivate: [unsavedChangesGuard]
    },
    {
        path: 'contacts/:id/edit',
        loadComponent: () => import('./features/contact-form/contact-form.component').then(m => m.ContactFormComponent),
        canDeactivate: [unsavedChangesGuard]
    }
];
