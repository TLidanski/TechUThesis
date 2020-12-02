import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class PostService {

	constructor(private http: HttpClient) { }
	  
	// getPost = () => {
	// 	return this.http.get(`${environment.baseUrl}/posts/10`);
	// }

	getPosts = () => {
		return this.http.get(`${environment.baseUrl}/posts`);
	}

	getComments = (postId: string) => {
		return this.http.get(`${environment.baseUrl}/comments/${postId}`);
	}

	react = (paramsObj: Object) => {
		return this.http.post(`${environment.baseUrl}/reactions`, paramsObj);
	}

	getReactions = (postId: string) => {
		return this.http.get(`${environment.baseUrl}/reactions/${postId}`);
	}
}
