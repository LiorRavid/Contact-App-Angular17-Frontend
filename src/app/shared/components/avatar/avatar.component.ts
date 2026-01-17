import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
    @Input({ required: true }) set src(value: string | undefined) {
        this._src.set(value);
    }
    @Input() set firstName(value: string | undefined) {
        this._firstName.set(value);
    }
    @Input() set lastName(value: string | undefined) {
        this._lastName.set(value);
    }
    @Input() size: number = 40;

    private _src = signal<string | undefined>(undefined);
    private _firstName = signal<string | undefined>(undefined);
    private _lastName = signal<string | undefined>(undefined);
    private _imageError = signal<boolean>(false);

    imageUrl = computed(() => !this._imageError() ? this._src() : undefined);

    initials = computed(() => {
        const first = this._firstName()?.charAt(0) || '';
        const last = this._lastName()?.charAt(0) || '';
        return (first + last).toUpperCase() || '?';
    });

    altText = computed(() => {
        return `Avatar of ${this._firstName() || ''} ${this._lastName() || ''}`;
    });

    onImageError() {
        this._imageError.set(true);
    }
}
