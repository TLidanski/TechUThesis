import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentReplies = (commentId: string) => {
    return this.http.get(`${environment.baseUrl}/comments/replies/${commentId}`);
  }
}
