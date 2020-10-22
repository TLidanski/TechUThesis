import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	post: any;

	constructor(postService: PostService) {
		this.post = postService.getPost().subscribe((post: any) => {
			console.log(post);
			this.post = post;
		});
	}

	ngOnInit(): void {
	}
}
