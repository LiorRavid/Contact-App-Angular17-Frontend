import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatIconModule, SearchInputComponent],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    private router = inject(Router);

    goHome(): void {
        this.router.navigate(['/contacts']);
    }
}
