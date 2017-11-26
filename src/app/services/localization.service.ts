import { Inject, Injectable } from '@angular/core';
import { Gender, MaritalStatus } from '../shared/models';

@Injectable()
export class LocalizationService {

    getGenderDisplayName(gender: Gender): string {
        switch (gender) {
            case Gender.Female: {
                return "Female";
            }
            case Gender.Male: {
                return "Male";
            }
            default: {
                return "";
            }
        }
    }

    getMaritalStatusDisplayName(status: MaritalStatus): string {
        switch (status) {
            case MaritalStatus.Unspecified: {
                return "Unspecified";
            }
            case MaritalStatus.Single: {
                return "Single";
            }
            case MaritalStatus.NotSingle: {
                return "NotSingle";
            }
            default: {
                return "";
            }
        }
    }
}