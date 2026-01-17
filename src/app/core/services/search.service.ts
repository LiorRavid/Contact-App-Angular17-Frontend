import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private searchSubject = new BehaviorSubject<string>('');

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
