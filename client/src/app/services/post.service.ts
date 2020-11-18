import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class PostService {

	constructor(private http: HttpClient) { }
	  
	getPost = () => {
		return this.http.get(`${environment.baseUrl}/posts/10`);
	}

	getPosts = () => {
		return this.http.get(`${environment.baseUrl}/posts`);
	}
}
