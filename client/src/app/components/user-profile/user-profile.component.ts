import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	public user;
	public currentUser;
	public friendRequestSent: boolean = false;
	public isFriend: boolean = false;
	private username: string;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService
	) {}

	ngOnInit(): void {		
		const userLocalStorageItem = localStorage.getItem('currentUser');
		if (userLocalStorageItem) {
			this.currentUser = JSON.parse(userLocalStorageItem);
		}

		this.route.params.subscribe(params => {
			this.username = params.username;
			this.loadUser();
		});
	}

	loadUser = async () => {
		this.user = await this.userService.getUserByUsername(this.username);
		if (this.user.id !== this.currentUser.id) {
			this.checkFriendShip();
		}
	}

	sendFriendRequest = async () => {
		await this.userService.sendFriendRequest({fromId: this.currentUser.id, toId: this.user.id});
		this.friendRequestSent = true;
	}

	checkFriendShip = async () => {
		const requests: any = await this.userService.getFriendRequests(this.user.id);
		this.friendRequestSent = requests.some(e => e.fromId === this.currentUser.id);
		this.isFriend = await this.userService.hasFriend({id: this.user.id, friendId: this.currentUser.id});
	}
}
