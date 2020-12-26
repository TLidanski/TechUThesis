import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user-profile-friends',
	templateUrl: './user-profile-friends.component.html',
	styleUrls: ['./user-profile-friends.component.scss']
})
export class UserProfileFriendsComponent implements OnInit {
	public friends;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.loadFriends();
	}

	loadFriends = async () => {
		const user: any = await this.userService.getUserByUsername(this.route.parent.snapshot.params.username);
		this.friends = await this.userService.getFriends(user.id);
	}
}
