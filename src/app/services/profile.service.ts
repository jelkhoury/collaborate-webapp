import { Inject, Injectable } from '@angular/core';
import { Gender, MaritalStatus } from '../shared/models';
import { Observable } from "rxjs/Rx";
import { Http } from "@angular/http";

@Injectable()
export class ProfileService {
  constructor( @Inject('API_URL') private _apiUrl: string, private _http: Http) {

  }

  getProfileByUserId(userId: number): Observable<UserProfile> {
    var url = this._apiUrl + '/api/users/' + userId;
    return this._http.get(url).map(r => r.json() as UserProfile);
  }

  getProfilePictureUrl(pictureId: string): string {
    var pictureUrl = '/img/user-avatar.jpg';

    if (pictureId) {
      pictureUrl = this._apiUrl + '/api/management/profile/picture?fileId=' + pictureId;
    }

    return pictureUrl;
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    var url = this._apiUrl + '/api/account/credentials';

    return this._http.put(url, { current: currentPassword, new: newPassword })
      .map(r => r.json() as boolean);
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
