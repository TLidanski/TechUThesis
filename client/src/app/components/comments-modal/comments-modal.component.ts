import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
	selector: 'app-comments-modal',
	templateUrl: './comments-modal.component.html',
	styleUrls: ['./comments-modal.component.scss']
})
export class CommentsModalComponent implements OnInit {
	@Input() show: boolean = false;
	@Input() post: any;
	@Output() toggleModalEvent = new EventEmitter<any>();

	constructor(private postService: PostService) { }

	ngOnInit(): void {
	}

	toggleModal = () => {
		this.show = !this.show;
		this.toggleModalEvent.emit();
	}

	commentAdded = () => {
		this.postService.getComments(this.post.id).subscribe(comments => {
			this.post.comments = comments;
		});
	}
}
