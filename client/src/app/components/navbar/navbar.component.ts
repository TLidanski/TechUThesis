import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	currentUser: Object;
	isAuthenticated: boolean;

	constructor() {
		try {
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		} catch (error) {
			console.error(error);
		} finally {
			this.isAuthenticated = true;
		}
	}

	ngOnInit(): void {
	}

}
