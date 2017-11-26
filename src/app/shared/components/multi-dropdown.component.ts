import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
    selector: 'sc-multi-dropdown',
    templateUrl: './multi-dropdown.component.html'
})

export class MultiDropdownComponent {
    // ids of selected options
    @Input() allOptions: number[];
    // all possible options
    @Input() selection: IMultiSelectOption[];
    // notify when selection change
    @Output() selectionChange = new EventEmitter();

    onChange($event): void {
        this.selection = $event;
        this.selectionChange.emit(this.selection);
    }
}

export class MultiDropdownOption implements IMultiSelectOption {
    id: any;
    name: string;
    isLabel?: boolean;
    parentId?: any;
    params?: any;
}