import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	isAuthenticated = () => {
		return this.http.get(`${environment.baseUrl}/isAuthenticated`, {withCredentials: true});
	}

	login = (params: Object) => {
		this.http.post(`${environment.baseUrl}/login`, params, {withCredentials: true}).subscribe((response: any) => {
			if (response.success) {
				localStorage.setItem('currentUser', JSON.stringify(response.user));
				this.router.navigate(['']);
			}
		});
	}

	logout = () => {
		this.http.post(`${environment.baseUrl}/logout`, {}, {withCredentials: true}).subscribe(() => {
			localStorage.removeItem('currentUser');
			this.router.navigate(['login']);
		});
	}

	register = (params: Object) => {
		return this.http.post(`${environment.baseUrl}/users`, params, {withCredentials: true});
	}

	sendProfilePicture = (params: FormData) => {
		return this.http.post(`${environment.baseUrl}/users/avatar`, params, {withCredentials: true});
	}
}
