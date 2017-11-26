import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sc-dropdown',
    templateUrl: './dropdown.component.html'
})

export class DropdownComponent {
    // selected option
    public selectedOption: DropdownOption = {
        id: -1,
        name: '-- Select --'
    };
    // ids of selected options
    @Input() selection: number;
    // all possible options
    @Input() options: DropdownOption[];
    // notify when selection change
    @Output() selectionChange = new EventEmitter();

    onChange(option): void {
        this.selectedOption = option;
        this.selection = this.selectedOption.id;
        this.selectionChange.emit(this.selection);
    }
}

export class DropdownOption {
    id: any;
    name: string;
}