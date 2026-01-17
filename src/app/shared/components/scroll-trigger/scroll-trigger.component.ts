import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
    selector: 'app-scroll-trigger',
    standalone: true,
    template: '',
    styles: [':host { display: block; height: 1px; }']
})
export class ScrollTriggerComponent implements OnInit {
    @Output() triggered = new EventEmitter<void>();

    ngOnInit() {
        this.triggered.emit();
    }
}
