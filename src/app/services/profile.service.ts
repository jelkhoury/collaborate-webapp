import { Inject, Injectable } from '@angular/core';
import { Gender, MaritalStatus } from '../shared/models';
import { Observable } from "rxjs/Rx";
import { Http } from "@angular/http";

@Injectable()
export class ProfileService {

    constructor( @Inject('ORIGIN_URL') private _originUrl: string, private _http: Http) {

    }

    getProfileByUserId(userId: number): Observable<UserProfile> {
        var url = this._originUrl + '/api/user/' + userId;
        return this._http.get(url).map(r => r.json() as UserProfile);
    }

    getProfilePictureUrl(pictureId: string): string {
        var pictureUrl = '/img/user-avatar.jpg';

        if (pictureId) {
            pictureUrl = this._originUrl + '/api/management/profile/picture?fileId=' + pictureId;
        }

        return pictureUrl;
    }
}

export class UserProfile {
    id: number;
    nickname: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    maritalStatus: MaritalStatus;
    birthDate: Date;
}