import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	login = (params: Object) => {
		return this.http.post(`${environment.baseUrl}/login`, params);
	}

	logout = () => {
		return this.http.post(`${environment.baseUrl}/logout`, {});
	}

	register = (params: Object) => {
		return this.http.post(`${environment.baseUrl}/users`, params);
	}

	sendProfilePicture = (params: FormData) => {
		return this.http.post(`${environment.baseUrl}/users/avatar`, params);
	}
}
