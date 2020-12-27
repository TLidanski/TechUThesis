import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	@Input() post: any;
	isMobile: boolean = window.innerWidth < 600;
	showCommentsModal = false;

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

	@HostListener('window:resize', ['$event'])
	onResize = (event) => {
		this.isMobile = event.target.innerWidth < 600;
	}
}
