import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sc-datepicker',
    templateUrl: './datepicker.component.html'
})

export class DatepickerComponent {
    @Output() selectedDateChange = new EventEmitter();
    @Input() selectedDate: Date;
    @Input() class: string;

    onChange($event): void {
        this.selectedDate = $event;
        this.selectedDateChange.emit(this.selectedDate);
    }
}
