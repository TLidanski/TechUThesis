import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user-profile-posts',
	templateUrl: './user-profile-posts.component.html',
	styleUrls: ['./user-profile-posts.component.scss']
})
export class UserProfilePostsComponent implements OnInit {
	private username: string;
	public posts;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.route.parent.params.subscribe(params => {
			this.username = params.username;
			this.loadPosts();
		});
	}

	loadPosts = async () => {
		const user: any = await this.userService.getUserByUsername(this.username);
		this.posts = await this.userService.getPosts(user.id);
	}
}
