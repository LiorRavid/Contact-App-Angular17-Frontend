import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
    @Output() scrolled = new EventEmitter<void>();

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                this.scrolled.emit();
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
