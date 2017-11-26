import { Component, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { Gender } from '../models';

@Component({
    selector: 'gender',
    templateUrl: './gender.component.html',
    providers: [LocalizationService]
})

export class GenderComponent implements OnChanges {
    private _localizationService: LocalizationService;

    @Input() selectedGender: Gender;
    @Output() selectedGenderChange = new EventEmitter();

    public genderDisplayName: string;

    constructor(localizationService: LocalizationService) {
        this._localizationService = localizationService;
    }

    // catch changes from the outside
    ngOnChanges(changes: SimpleChanges): void {
        this.genderDisplayName = this._localizationService.getGenderDisplayName(this.selectedGender);
    }

    // internal selection changed
    onSelect(gender: Gender) {
        this.selectedGender = gender;
        this.genderDisplayName = this._localizationService.getGenderDisplayName(gender);

        this.selectedGenderChange.emit(this.selectedGender);
    }
}