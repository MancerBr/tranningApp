import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AUTH_ENDPOINT} from '../shared/constants/endpoints';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(user) {
        return this.http.post(`${environment.backendUrl}/${AUTH_ENDPOINT}`, user);
    }
}
