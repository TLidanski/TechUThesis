import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
	@Input() comment: any;
	replies: any[];
	showSubComments: boolean = false;
	showReplyForm: boolean = false;

	constructor(private commentService: CommentService) { }

	ngOnInit(): void {
	}

	showReplies = () => {
		this.showSubComments = !this.showSubComments;
	}

	getReplies = () => {
		return new Promise((resolve, reject) => {
			this.commentService.getCommentReplies(this.comment.id).subscribe((replies: any) => {
				this.comment.replies = replies;
				resolve();
			});
		});
	}

	reply = () => {
		this.showReplyForm = !this.showReplyForm;
	}

	replyAdded = () => {
		this.getReplies().then(() => {
			this.showSubComments = true;
		});
	}
}
