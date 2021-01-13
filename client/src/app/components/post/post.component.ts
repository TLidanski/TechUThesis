import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	@Input() post: any;
	@Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
	isMobile: boolean = window.innerWidth < 600;
	showMenu = false;
	showCommentsModal = false;
	showPostMediaModal = false;

	constructor(private postService: PostService) {
	}

	ngOnInit(): void {
	}

	commentAdded = () => {
		this.postService.getComments(this.post.id).subscribe(comments => {
			this.post.comments = comments;
		});
	}

	reactionAdded = () => {
		this.postService.getReactions(this.post.id).subscribe(reactions => {
			this.post.reactions = reactions;
		});
	}

	toggleCommentsModal = () => {
		this.showCommentsModal = !this.showCommentsModal;
	}

	togglePostMediaModal = () => {
		this.showPostMediaModal = !this.showPostMediaModal;
	}

	toggleMenu = () => {
		this.showMenu = !this.showMenu;
	}

	delete = async () => {
		await this.postService.delete(this.post.id);
		this.deleteEvent.emit();
	}

	@HostListener('window:resize', ['$event'])
	onResize = (event) => {
		this.isMobile = event.target.innerWidth < 600;
	}
}
