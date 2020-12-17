import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-file-input',
	templateUrl: './file-input.component.html',
	styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
	@Input() element: string;
	@Input() text: string;
	@Input() images: string[];

	constructor() { }

	ngOnInit(): void {
	}
	
}