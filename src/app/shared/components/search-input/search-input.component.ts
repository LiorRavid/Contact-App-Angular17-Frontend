import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil, tap } from 'rxjs';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  private searchService = inject(SearchService);

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();
  isFocused = false;

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      tap(value => this.searchService.updateSearchTerm(value || '')),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
