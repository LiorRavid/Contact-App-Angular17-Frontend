import { FormControl } from '@angular/forms';

export interface ContactFormModel {
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    phone: FormControl<string | null>;
    cell: FormControl<string | null>;
    picture: FormControl<string | null>;
}
