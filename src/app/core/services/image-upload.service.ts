import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageUploadService {
    private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    private readonly MAX_SIZE_MB = 2;

    uploadImage(file: File): Observable<string> {
        if (!this.ALLOWED_TYPES.includes(file.type)) {
            return throwError(() => new Error('Invalid file type. Please upload an image (JPG, PNG, GIF, WEBP).'));
        }

        if (file.size > this.MAX_SIZE_MB * 1024 * 1024) {
            return throwError(() => new Error(`File is too large. Maximum size is ${this.MAX_SIZE_MB}MB.`));
        }

        return from(this.readFileAsDataURL(file));
    }

    private readFileAsDataURL(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
}
