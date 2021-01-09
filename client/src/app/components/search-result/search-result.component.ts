import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
	@Input() result;
	@Output() searchClickEvent = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void {
	}

	onSearchClick = () => {
		this.searchClickEvent.emit();
	}
}