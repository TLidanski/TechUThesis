import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.scss']
})
export class FriendListItemComponent implements OnInit {
  @Input() user;
  show: boolean = false;
  unreadMessageCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  toggle = () => {
    this.show = !this.show;
    if (this.show) {
      this.unreadMessageCount = 0;
    }
	}

  setUnreadMessages = (unreadMsgCount) => {
    this.unreadMessageCount = unreadMsgCount;
  }
}
