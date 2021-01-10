import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-post-media-modal',
	templateUrl: './post-media-modal.component.html',
	styleUrls: ['./post-media-modal.component.scss']
})
export class PostMediaModalComponent implements OnInit {
	@Input() show;
	@Input() post;
	@Output() togglePostMediaModalEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() commentAddedEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() reactionAddedEvent: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void {
	}

	toggleModal = () => {
		this.togglePostMediaModalEvent.emit();
	}

	commentAdded = () => {
		this.commentAddedEvent.emit();
	}

	reactionAdded = () => {
		this.reactionAddedEvent.emit();
	}
}