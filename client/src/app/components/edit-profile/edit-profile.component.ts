import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
	currentUser: any;
	avatar: string;
	imagesForPreview: string[];

	editProfileForm: FormGroup = new FormGroup({
		username: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
		confirmPassword: new FormControl(''),
		avatar: new FormControl('')
	});

	constructor(
		private http: HttpClient,
		private router: Router
	) {
		const currentUserStorage = localStorage.getItem('currentUser');
		if (currentUserStorage) {
			this.currentUser = JSON.parse(currentUserStorage);
		}
	}

	ngOnInit(): void {
		this.imagesForPreview = [];
	}

	submit = () => {
		let paramObj = {};
		for (const key in this.editProfileForm.value) {
			const element = this.editProfileForm.value[key];
			if (element) { 
				paramObj[key] = element;
			}
		}

		this.http.put(`${environment.baseUrl}/users/${this.currentUser.id}`, paramObj, {withCredentials: true}).subscribe(() => {
			if (this.avatar) {
				const formData = new FormData();
				formData.append('user', this.currentUser.id);
				formData.append('avatar', this.avatar);

				this.http.post(`${environment.baseUrl}/users/avatar`, formData, {withCredentials: true}).subscribe((res: any) => {
					this.currentUser = res;
					localStorage.setItem('currentUser', JSON.stringify(res));
				});
			}

			this.router.navigate(['user', this.currentUser.username, 'posts']);
		});		
	}

	prepareImageForPreview = (files) => {
		for (const file of files) {
			const reader = new FileReader();

			reader.onload = (e: any) => {
				this.imagesForPreview.push(e.target.result);
			}

			reader.readAsDataURL(file);		
		}
	}

	onImageSelect = (event) => {
		const files = event.target.files;
		this.imagesForPreview = [];

		if (files.length) {
			this.avatar = files[0];
			this.prepareImageForPreview(files);
		}
	}
}