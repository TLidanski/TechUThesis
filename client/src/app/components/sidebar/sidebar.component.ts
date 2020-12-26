import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	currentUser: any;
	friends;
	year;

	constructor(private userService: UserService) {
		const userLocalStorageItem = localStorage.getItem('currentUser');
		if (userLocalStorageItem) {
			this.currentUser = JSON.parse(userLocalStorageItem);
		}

		this.setFriends();
		this.year = new Date().getFullYear();
	}

	ngOnInit(): void {}

	setFriends = async () => {
		this.friends = await this.userService.getFriends(this.currentUser.id);
	}
}
