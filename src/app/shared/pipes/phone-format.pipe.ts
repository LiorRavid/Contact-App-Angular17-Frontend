import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat',
    standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
    transform(value: string | undefined): string {
        if (!value) return '';

        // Remove all non-numeric characters
        let cleaned = ('' + value).replace(/\D/g, '');

        // Handle Israel's 972 country code
        if (cleaned.startsWith('972')) {
            cleaned = '0' + cleaned.substring(3);
        }

        // Format for Israeli Mobile (05X-XXXXXXX)
        if (cleaned.length === 10 && cleaned.startsWith('05')) {
            return `${cleaned.substring(0, 3)}-${cleaned.substring(3)}`;
        }

        // Format for Israeli Landline (0X-XXXXXXX) - basically non-05 prefixes like 02, 03, 04, 08, 09
        if (cleaned.length === 9 && cleaned.startsWith('0')) {
            return `${cleaned.substring(0, 2)}-${cleaned.substring(2)}`;
        }

        // Generic fallback for other formats (e.g. XXX-XXX-XXXX)
        if (cleaned.length > 7) {
            return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
        }

        return cleaned;
    }
}
