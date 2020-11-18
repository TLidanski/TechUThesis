import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: any[];

  constructor(postService: PostService) { 
    postService.getPosts().subscribe((posts: any) => {
			this.posts = posts;
		});
  }

  ngOnInit(): void {
  }

}
