import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-reactions-data',
	templateUrl: './reactions-data.component.html',
	styleUrls: ['./reactions-data.component.scss']
})
export class ReactionsDataComponent implements OnInit {
	@Input() reactions: any[];
	reacts: any[];

	constructor() {
		this.reacts = [];
	}

	ngOnInit(): void {
		for (const react of this.reactions) {
			if (!(react.reaction in this.reacts)) {
				
				this.reacts[react.reaction] = {
					file: react.reaction.toLowerCase() + '.svg',
					displayValue: react.reaction.charAt(0) + react.reaction.slice(1).toLowerCase(),
					users: []
				};
			}
			this.reacts[react.reaction].users.push(react.user.firstName + ' ' + react.user.lastName);
		}
	}

}