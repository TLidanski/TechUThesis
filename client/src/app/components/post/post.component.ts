import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	@Input() post: any;
	isMobile: boolean = window.innerWidth < 600;

	constructor() {
	}

	ngOnInit(): void {
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.isMobile = event.target.innerWidth < 600;
	}
}
