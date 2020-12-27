import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PostService } from '../../services/post.service';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
	private media;
	private currentUser;

	previewImages: string[];
	postForm: FormGroup = new FormGroup({
		text: new FormControl('', Validators.required),
		media: new FormControl('')
	});

	constructor(private postService: PostService) {
		const userLocalStorageItem = localStorage.getItem('currentUser');
		if (userLocalStorageItem) {
			this.currentUser = JSON.parse(userLocalStorageItem);
		}
	}

	ngOnInit(): void {
		this.previewImages = [];
	}

	post = async () => {
		const formData = new FormData();
		formData.append('userId', this.currentUser.id);
		formData.append('text', this.postForm.value.text);
		
		for (const file of this.media) {
			formData.append('media', file);
		}

		await this.postService.post(formData);
	}

	prepareImagesForPreview = (files) => {
		for (const file of files) {
			const reader = new FileReader();

			reader.onload = (e: any) => {
				this.previewImages.push(e.target.result);
			}

			reader.readAsDataURL(file);		
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
