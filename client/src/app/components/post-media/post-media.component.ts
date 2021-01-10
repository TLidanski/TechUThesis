import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';

@Component({
	selector: 'app-post-media',
	templateUrl: './post-media.component.html',
	styleUrls: ['./post-media.component.scss'],
	animations: [
		trigger('swipeInOut', [
			transition(':enter', [
				style({opacity: 0, transform: 'scale(0.5)', position: 'absolute'}),
				animate('300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)', style({opacity: 1, transform: 'scale(1)'}))
			]),
			transition(':leave', [
				style({position: 'absolute'}),
				animate('300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)', style({opacity: 0, transform: 'scale(0.5)'}))
			])
		])
	]
})
export class PostMediaComponent implements OnInit {
	@Input() media: any[];
	@Output() togglePostMediaModalEvent: EventEmitter<any> = new EventEmitter<any>();

	private index: number = 0;
	private swipeCoord?: [number, number];
	private swipeTime?: number;
	public showCarouselControls: boolean;

	public swipeActions: Object = {
		next: () => {
			if (this.index < this.media.length - 1) {
				++this.index;
			} else {
				this.index = 0;
			}
		},
		prev: () => {
			if (this.index >= 1) {
				--this.index;
			} else {
				this.index = (this.media.length - 1);
			}
		}
	};

	constructor() { }

	ngOnInit(): void {
		this.showCarouselControls = this.media.length > 1;
	}

	swipe = (e: TouchEvent, when: string): void => {
		const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
		const time = new Date().getTime();

		if (when === 'start') {
			this.swipeCoord = coord;
			this.swipeTime = time;
		} else if (when === 'end') {
			const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
			const duration = time - this.swipeTime;

			if (duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
				const swipe = direction[0] < 0 ? 'next' : 'prev';
				this.swipeActions[swipe]();
			}
		}
	}

	toggleModal = () => {
		this.togglePostMediaModalEvent.emit();
	}
}
