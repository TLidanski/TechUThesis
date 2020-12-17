import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
	activeForm: boolean = true;
	avatar: string;
	imagesForPreview: string[];

	loginForm: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});

	registerForm: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		email: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		confirmPassword: new FormControl('', Validators.required),
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		day: new FormControl('', Validators.required),
		month: new FormControl('0', Validators.required),
		year: new FormControl('', Validators.required),
		gender: new FormControl('Male', Validators.required),
		avatar: new FormControl('')
	});

	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.imagesForPreview = [];
	}

	ngOnInit(): void {
	}

	login = () => {
		this.authService.login(this.loginForm.value).subscribe((response: any) => {
			if (response.success) {
				sessionStorage.setItem('currentUser', JSON.stringify(response.user));
				this.router.navigate(['']);
			}
		});
	}

	logout = () => {
		this.authService.logout().subscribe(() => {
			sessionStorage.removeItem('currentUser');
		});
	}

	register = () => {
		const formValues = this.registerForm.value;
		const params = {
			username: formValues.username,
			email: formValues.email,
			password: formValues.password,
			confirmPassword: formValues.confirmPassword,
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			birthday: new Date(formValues.year, formValues.month, formValues.day),
			gender: formValues.gender
		};

		this.authService.register(params).subscribe((response: any) => {
			const formData = new FormData();
			formData.append('user', response.id);
			formData.append('avatar', this.avatar);
			
			this.authService.sendProfilePicture(formData).subscribe(res => {
				
				this.authService.login({
					username: params.username,
					password: params.password
				}).subscribe((response: any) => {
					if (response.success) {
						sessionStorage.setItem('currentUser', JSON.stringify(response.user));
						this.router.navigate(['']);
					}
				});
			});
		});
	}

	setActiveForm = (bool: boolean) => {
		this.activeForm = bool;
	}

	prepareImageForPreview = (files) => {
		const reader = new FileReader();

		reader.onload = (e: any) => {
			this.imagesForPreview.push(e.target.result);
		}

		for (const file of files) {
			reader.readAsDataURL(file);		
		}
	}

	onImageSelect = (event) => {
		const files = event.target.files;

		if (files.length) {
			this.avatar = files[0];
			this.prepareImageForPreview(files);
		}
	}
}