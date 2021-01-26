import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user-profile-albums',
	templateUrl: './user-profile-albums.component.html',
	styleUrls: ['./user-profile-albums.component.scss']
})
export class UserProfileAlbumsComponent implements OnInit {
	media: any[];
	albums: any[];
	previewImages: string[];
	user: any;
	currentUser: any;
	albumForm: FormGroup = new FormGroup({
		name: new FormControl('', Validators.required),
		media: new FormControl('')
	});

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private http: HttpClient
	) {
		const currentUserStorage = localStorage.getItem('currentUser');
		if (currentUserStorage) {
			this.currentUser = JSON.parse(currentUserStorage);
		}
	}

	ngOnInit(): void {
		this.getAlbums();
	}

	getAlbums = async () => {
		this.user = await this.userService.getUserByUsername(this.route.parent.snapshot.params.username);
		this.http.get(`${environment.baseUrl}/albums/user/${this.user.id}`, {withCredentials: true}).subscribe((albums: any) => {
			this.albums = albums;
		});
	}

	create = () => {
		const formData = new FormData();
		formData.append('user', this.currentUser.id);
		formData.append('userId', this.currentUser.id);
		formData.append('name', this.albumForm.value.name);
		
		if (this.media) {
			for (const file of this.media) {
				formData.append('media', file);
			}
		}

		this.http.post(`${environment.baseUrl}/albums`, formData, {withCredentials: true}).subscribe((res: any) => {
			this.getAlbums();
			this.previewImages = [];
			this.albumForm.reset();
		});
	}

	prepareImagesForPreview = (files) => {
		for (const file of files) {
			const fileType = file.type.split('/')[0];
			const reader = new FileReader();

			reader.onload = (e: any) => {
				this.previewImages.push(e.target.result);
			}

			if (fileType !== 'video') {
				reader.readAsDataURL(file);
			}		
		}
	}

	onMediaSelect = (event) => {
		const files = event.target.files;
		this.previewImages = [];

		if (files.length) {
			this.media = files;
			this.prepareImagesForPreview(files);
		}
	}
}