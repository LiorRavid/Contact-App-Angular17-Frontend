import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private searchSubject = new BehaviorSubject<string>('');

    /**
     * Powerful search stream using switchMap. 
     * In a real-world scenario, the switchMap would trigger an API call.
     * Here it manages the term stream, ensuring only the latest search is processed.
     */
    readonly searchTerm$: Observable<string> = this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => of(term))
    );

    updateSearchTerm(term: string): void {
        this.searchSubject.next(term);
    }

    get currentTerm(): string {
        return this.searchSubject.value;
    }
}
