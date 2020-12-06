import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

import { environment } from '../../../../environments/environment';
import { AUTH_ENDPOINT } from '../../constants/endpoints';
import { Login } from '../../types';
import { LOCAL_STORAGE } from '../../constants/localStorage';


@Injectable({ providedIn: 'root'})
export class AuthService {

    constructor(
        private http: HttpClient,
        private device: Device,
        private platform: Platform,
    ) {}

    static setTokens(token: { access_token: string;  refresh_token: string; }): void {
        if (token.access_token) {
            localStorage.setItem(LOCAL_STORAGE.AUTH.ACCESS_TOKEN, token.access_token);
        }

        if (token.refresh_token) {
            localStorage.setItem(LOCAL_STORAGE.AUTH.REFRESH_TOKEN, token.refresh_token);
        }
    }

    static clearTokens(): void {
        localStorage.setItem(LOCAL_STORAGE.AUTH.ACCESS_TOKEN, '');
        localStorage.setItem(LOCAL_STORAGE.AUTH.REFRESH_TOKEN, '');
    }

    static getTokens(): { access_token: string;  refresh_token: string; } {
        return {
            access_token: localStorage.getItem(LOCAL_STORAGE.AUTH.ACCESS_TOKEN),
            refresh_token: localStorage.getItem(LOCAL_STORAGE.AUTH.REFRESH_TOKEN),
        };
    }

    private static getTokenExpirationDate(token: string): Date {
        const decoded: any = jwt_decode(token);
        if (!decoded.exp) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    static isTokenExpired(token: string): boolean {
        if (!token) { return true; }

        const date = AuthService.getTokenExpirationDate(token);
        if (!date) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }

    login(user: Login): Observable<any> {
        const payload = {
            ...user,
            deviceId: this.getDeviceId(),
        }
        return this.http.post(`${environment.backendUrl}/${AUTH_ENDPOINT.LOGIN}`, payload);
    }

    private getDeviceId() {
        return this.platform.is('cordova')
            ? this.device.uuid
            : `${window.navigator.userAgent}`;
    }
}
