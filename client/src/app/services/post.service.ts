import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class PostService {

	constructor(private http: HttpClient) { }

	getPosts = (paramsObj: any) => {
		return this.http.get(`${environment.baseUrl}/posts/all/${paramsObj.userId}/${paramsObj.skip}/${paramsObj.take}`, {withCredentials: true});
	}

	getComments = (postId: string) => {
		return this.http.get(`${environment.baseUrl}/comments/${postId}`, {withCredentials: true});
	}

	react = (paramsObj: Object) => {
		return this.http.post(`${environment.baseUrl}/reactions`, paramsObj, {withCredentials: true});
	}

	getReactions = (postId: string) => {
		return this.http.get(`${environment.baseUrl}/reactions/${postId}`, {withCredentials: true});
	}

	post = (params: FormData) => {
		return new Promise(resolve => {

			this.http.post(`${environment.baseUrl}/posts`, params, {withCredentials: true}).subscribe(res => resolve(res));
		});
	}

	delete = (postId: string) => {
		return new Promise(resolve => {

			this.http.delete(`${environment.baseUrl}/posts/${postId}`,{withCredentials: true}).subscribe(res => resolve(res));
		});
	}

	share = (params: any) => {
		return new Promise(resolve => {

			this.http.post(`${environment.baseUrl}/posts/share`, params, {withCredentials: true}).subscribe(res => resolve(res));
		});
	}
}
