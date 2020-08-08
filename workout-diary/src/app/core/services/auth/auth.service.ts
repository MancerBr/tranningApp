import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {AUTH_ENDPOINT} from '../../constants/endpoints';
import {Login} from '../../types';

@Injectable({ providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(user: Login) {
        return this.http.post(`${environment.backendUrl}/${AUTH_ENDPOINT.LOGIN}`, user);
    }
}
