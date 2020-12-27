import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
	selector: 'app-comment-form',
	templateUrl: './comment-form.component.html',
	styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
	@Input() id: string;
	@Input() context: 'post' | 'comment' = 'post';
	@Output() newCommentEvent = new EventEmitter<any>();
	currentUser: any;

	commentForm: FormGroup = new FormGroup({
		comment: new FormControl('', Validators.required)
	});

	constructor(private commentService: CommentService) { }

	ngOnInit(): void {
		const currentUserStorage = localStorage.getItem('currentUser');
		if (currentUserStorage) {
			this.currentUser = JSON.parse(currentUserStorage);
		}
	}

	onSubmit() {
		const key = this.context === 'post' ? 'postId' : 'parentCommentId';
		const paramsObj: Object = {
			text: this.commentForm.value.comment,
			author: this.currentUser.id,
			[key]: this.id
		};

		this.commentService.postComment(paramsObj).subscribe(() => {
			this.newCommentEvent.emit();
		});
		this.commentForm.reset();
	}
}
