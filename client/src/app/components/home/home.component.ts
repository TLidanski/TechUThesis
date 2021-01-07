import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	posts: any[];
	currentUser: any;
	private queryOptions: any;
	private observer: IntersectionObserver;

	constructor(private postService: PostService) {
		const currentUserStorage = localStorage.getItem('currentUser');
		if (currentUserStorage) {
			this.currentUser = JSON.parse(currentUserStorage);
		}

		this.posts = [];
		this.queryOptions = {userId: this.currentUser.id, skip: 0, take: 2};
	}

	ngOnInit(): void {
		const options = {
			root: null
		};

		this.observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				this.getPosts();
			}
		}, options);

		this.observer.observe(document.querySelector('#anchor'));
	}

	ngOnDestroy(): void {
		this.observer.disconnect();
	}

	appendPost = () => {
		this.posts = [];
		this.queryOptions.skip = 0;
	}

	getPosts = () => {
		this.postService.getPosts(this.queryOptions).subscribe((posts: any) => {
			for (const post of posts) {
				this.posts.push(post);
			}
			this.queryOptions.skip += this.queryOptions.take;
		});
	}
}
