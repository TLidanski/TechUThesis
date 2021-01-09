import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	currentUser: any;
	friendRequests;
	searchResults;
	@ViewChild('search') search: ElementRef;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		public router: Router
	) {}

	ngOnInit(): void {
		const userLocalStorageItem = localStorage.getItem('currentUser');
		if (userLocalStorageItem) {
			this.currentUser = JSON.parse(userLocalStorageItem);
		}

		this.getFriendRequests();
	}

	onSearch = async (searchQuery: string) => {
		this.searchResults = await this.userService.searchUsers(searchQuery);
		if (!searchQuery.length) {
			this.searchResults = [];
		}
	}

	clearSearchInput = () => {
		this.search.nativeElement.value = '';
		this.searchResults = [];
	}

	logout = () => {
		this.authService.logout();
	}

	getFriendRequests = async () => {
		this.friendRequests = await this.userService.getFriendRequests(this.currentUser.id);
	}

	acceptFriendRequest = async (request) => {
		await this.userService.acceptFriendRequest({id: request.toId, friendId: request.fromId});
		this.getFriendRequests();
	}

	declineFriendRequest = async (request) => {
		await this.userService.deleteFriendRequest(request.id);
		this.getFriendRequests();
	}
}