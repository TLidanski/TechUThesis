import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	getFriends = (userId: string) => {
		return new Promise(resolve => {

			this.http.get(`${environment.baseUrl}/users/friends/${userId}`).subscribe((res: any) => {
				resolve(res.friends);
			});
		});
	}
}