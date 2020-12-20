import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CommentService {

	constructor(private http: HttpClient) { }

	getCommentReplies = (commentId: string) => {
		return this.http.get(`${environment.baseUrl}/comments/replies/${commentId}`, {withCredentials: true});
	}

	postComment = (paramsObj: Object) => {
		return this.http.post(`${environment.baseUrl}/comments`, paramsObj, {withCredentials: true});
	}

	react = (paramsObj: Object) => {
		return this.http.post(`${environment.baseUrl}/reactions`, paramsObj, {withCredentials: true});
	}

	getReacts = (commentId: string) => {
		return this.http.get(`${environment.baseUrl}/reactions/comments/${commentId}`, {withCredentials: true});
	}
}
