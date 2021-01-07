import { Component, OnInit, Input, Output, EventEmitter, Renderer2, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { io } from 'socket.io-client';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
	@Input() user;
	@Input() show;
	@Output() toggleModalEvent = new EventEmitter<any>();
	@ViewChild('scroll') private scroll: ElementRef;
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

	ngAfterViewChecked(): void {        
		this.scrollToBottom();        
	}

	getMessages = () => {
		this.http.get(`${environment.baseUrl}/chat/messages/${this.currentUser.id}/${this.user.id}`, {withCredentials: true}).subscribe((messages: any) => {
			this.messages = messages;
		});
	}

	initEvents = () => {
		this.socket.on('server-message', (msgObj: any) => {
			this.messages.push(msgObj);
			this.scrollToBottom();
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

	scrollToBottom = () => {
		try {
            this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
        } catch(err) { }
	}
}
