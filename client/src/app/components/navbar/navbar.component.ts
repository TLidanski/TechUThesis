import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	currentUser: Object = null;

	constructor(
		private authService: AuthService,
		public router: Router
	) {}

	ngOnInit(): void {
		const userLocalStorageItem = localStorage.getItem('currentUser');
		if (userLocalStorageItem) {
			this.currentUser = JSON.parse(userLocalStorageItem);
		}
	}

	logout = () => {
		this.authService.logout();
	}
}