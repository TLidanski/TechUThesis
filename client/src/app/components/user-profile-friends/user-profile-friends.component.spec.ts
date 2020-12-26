import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileFriendsComponent } from './user-profile-friends.component';

describe('UserProfileFriendsComponent', () => {
  let component: UserProfileFriendsComponent;
  let fixture: ComponentFixture<UserProfileFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
