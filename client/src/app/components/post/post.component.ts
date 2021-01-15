import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	@Input() post: any;
	@Output() refreshEvent: EventEmitter<any> = new EventEmitter<any>();
	currentUser: any;
	isMobile: boolean = window.innerWidth < 600;
	showMenu = false;
	showCommentsModal = false;
	showPostMediaModal = false;

	constructor(private postService: PostService) {
	}

	ngOnInit(): void {
		const currentUserStorage = localStorage.getItem('currentUser');
		if (currentUserStorage) {
			this.currentUser = JSON.parse(currentUserStorage);
		}
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
		this.refreshEvent.emit();
	}

	share = async () => {
		await this.postService.share({post: this.post, user: this.currentUser});
		this.refreshEvent.emit();
	}

	@HostListener('window:resize', ['$event'])
	onResize = (event) => {
		this.isMobile = event.target.innerWidth < 600;
	}
}
