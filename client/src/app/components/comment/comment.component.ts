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

	constructor(private commentService: CommentService) {
	}

	ngOnInit(): void {
		this.commentService.getReacts(this.comment.id).subscribe(reacts => {
			this.comment.reactions = reacts;
		});
	}

	showReplies = () => {
		this.showSubComments = !this.showSubComments;
	}

	getReplies = () => {
		this.commentService.getCommentReplies(this.comment.id).subscribe((replies: any) => {
			this.comment.replies = replies;
			this.showSubComments = true;
		});
	}

	reply = () => {
		this.showReplyForm = !this.showReplyForm;
	}

	replyAdded = () => {
		this.getReplies();
	}

	reactionAdded = () => {
		this.commentService.getReacts(this.comment.id).subscribe(reactions => {
			this.comment.reactions = reactions;
		});
	}
}
