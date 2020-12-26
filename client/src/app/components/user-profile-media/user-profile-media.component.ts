import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user-profile-media',
	templateUrl: './user-profile-media.component.html',
	styleUrls: ['./user-profile-media.component.scss']
})
export class UserProfileMediaComponent implements OnInit {
	public media;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.loadMedia();
	}

	loadMedia = async () => {
		const user: any = await this.userService.getUserByUsername(this.route.parent.snapshot.params.username);
		this.media = await this.userService.getMedia(user.id);
	}
}
