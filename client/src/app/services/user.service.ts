import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	getUserByUsername = (username: string) => {
		return new Promise(resolve => {

			this.http.get(`${environment.baseUrl}/users/${username}`, {withCredentials: true}).subscribe((res: any) => {
				resolve(res);
			});
		});
	}

	getFriends = (userId: string) => {
		return new Promise(resolve => {

			this.http.get(`${environment.baseUrl}/users/friends/${userId}`, {withCredentials: true}).subscribe((res: any) => {
				resolve(res.friends);
			});
		});
	}

	getPosts = (userId: string) => {
		return new Promise(resolve => {

			this.http.get(`${environment.baseUrl}/posts/user/${userId}`, {withCredentials: true}).subscribe(res => resolve(res));
		});
	}

	getMedia = (userId: string) => {
		return new Promise(resolve => {

			this.http.get(`${environment.baseUrl}/users/media/${userId}`, {withCredentials: true}).subscribe(res => resolve(res));
		});
	}

	sendFriendRequest = (params: Object) => {
		return new Promise(resolve => {

			this.http.post(`${environment.baseUrl}/users/friends/request`, params, {withCredentials: true}).subscribe(res => resolve(res));
		});
	}

	getFriendRequests = (userId: string) => {
		return new Promise(resolve => {

			this.http.get(`${environment.baseUrl}/users/friends/request/${userId}`, {withCredentials: true}).subscribe(res => resolve(res));
		});
	}

	hasFriend = (params: Object): Promise<boolean> => {
		return new Promise(resolve => {

			this.http.post(`${environment.baseUrl}/users/friends/has-friend`, params, {withCredentials: true}).subscribe((res: any) => resolve(res.hasFriend));
		});
	}
}