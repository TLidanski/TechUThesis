import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	posts: any[];

	constructor(private postService: PostService) {
		this.getPosts();
	}

	ngOnInit(): void {
	}

	appendPost = () => {
		this.getPosts();
	}

	getPosts = () => {
		this.postService.getPosts().subscribe((posts: any) => {
			this.posts = posts;
		});
	}
}
