import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { io } from 'socket.io-client';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
	@Input() user;
	@Input() show;
	@Output() toggleModalEvent = new EventEmitter<any>();
	public currentUser;
	public messages: any[];
	public chatForm: FormGroup = new FormGroup({
		chat: new FormControl('', Validators.required)
	});
	private socket = io(environment.baseUrl, {withCredentials: true,});

	constructor(
		private http: HttpClient,
		private renderer: Renderer2
	) { }

	ngOnInit(): void {
		const currentUserStorage = localStorage.getItem('currentUser');
		if (currentUserStorage) {
			this.currentUser = JSON.parse(currentUserStorage);
		}

		this.socket.emit('join-room', {currentUser: this.currentUser, user: this.user});
		this.getMessages();
		this.initEvents();
	}

	ngOnChanges(changes: SimpleChanges): void {}

	getMessages = () => {
		this.http.get(`${environment.baseUrl}/chat/messages/${this.currentUser.id}/${this.user.id}`, {withCredentials: true}).subscribe((messages: any) => {
			this.messages = messages;
			console.log(this.messages);
		});
	}

	initEvents = () => {
		this.socket.on('server-message', (msgObj: any) => {
			this.messages.push(msgObj);
		});
	}

	onSubmit = () => {
		const msgObj = {
			msg: this.chatForm.value.chat,
			user: this.currentUser
		};
		this.socket.emit('message', msgObj);

		this.chatForm.reset();
		this.renderer.selectRootElement('#chat').focus();
	}

	toggle = () => {
		this.toggleModalEvent.emit();
	}
}
