import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-reactions-data',
	templateUrl: './reactions-data.component.html',
	styleUrls: ['./reactions-data.component.scss']
})
export class ReactionsDataComponent implements OnInit, OnChanges {
	@Input() reactions: any[];
	reacts: any[];

	constructor() {
		this.reacts = [];
	}

	ngOnInit(): void {
		this.initReacts(this.reactions);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.reactions.firstChange) {
			this.initReacts(this.reactions);
		}
	}

	initReacts = (reactions: any[]) => {
		for (const react of reactions) {
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