import { Component, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { MaritalStatus } from '../models';

@Component({
    selector: 'marital-status',
    templateUrl: './marital-status.component.html',
    providers: [LocalizationService]
})

export class MaritalStatusComponent implements OnChanges {
    private localizationService: LocalizationService;

    @Input() selectedStatus: MaritalStatus;
    @Output() change = new EventEmitter();

    public statusDisplayName: string;

    constructor(localizationService: LocalizationService) {
        this.localizationService = localizationService;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.statusDisplayName = this.localizationService.getMaritalStatusDisplayName(this.selectedStatus);
    }

    onSelect(status: MaritalStatus) {
        this.selectedStatus = status;
        this.statusDisplayName = this.localizationService.getMaritalStatusDisplayName(this.selectedStatus);

        this.change.emit({ newValue: this.selectedStatus });
    }
}