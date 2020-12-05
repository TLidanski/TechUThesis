import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
	selector: 'app-reactions-tooltip',
	templateUrl: './reactions-tooltip.component.html',
	styleUrls: ['./reactions-tooltip.component.scss']
})
export class ReactionsTooltipComponent implements OnInit {
	@Input() id: string;
	@Input() context: 'post' | 'comment' = 'post';
	@Output() newReactionEvent = new EventEmitter<any>();

	activeService;
	reactions = [
		{
			file: 'like.svg',
			displayValue: 'Like'
		},
		{
			file: 'love.svg',
			displayValue: 'Love'
		},
		{
			file: 'haha.svg',
			displayValue: 'Haha'
		},
		{
			file: 'woah.svg',
			displayValue: 'Woah'
		},
		{
			file: 'cry.svg',
			displayValue: 'Cry'
		},
		{
			file: 'angry.svg',
			displayValue: 'Angry'
		}
	];

	constructor(
		private postService: PostService,
		private commentService: CommentService
	) { }

	ngOnInit(): void {
		this.activeService = {
			'post': this.postService,
			'comment': this.commentService
		};
	}

	react = (event) => {
		const key = this.context === 'post' ? 'postId' : 'commentId';
		const params = {
			reaction: event.target.id,
			user: 13,
			[key]: this.id
		};

		this.activeService[this.context].react(params).subscribe(() => {
			this.newReactionEvent.emit();
		});
	}
}
