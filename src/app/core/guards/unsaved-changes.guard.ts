import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface HasUnsavedChanges {
    hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
    if (component.hasUnsavedChanges()) {
        const dialog = inject(MatDialog);

        return dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Unsaved Changes',
                message: 'You have unsaved changes. Are you sure you want to leave?',
                confirmText: 'Leave',
                cancelText: 'Stay'
            }
        }).afterClosed().pipe(
            map(result => !!result)
        );
    }

    return of(true);
};
