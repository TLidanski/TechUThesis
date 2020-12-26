import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAlbumsComponent } from './user-profile-albums.component';

describe('UserProfileAlbumsComponent', () => {
  let component: UserProfileAlbumsComponent;
  let fixture: ComponentFixture<UserProfileAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
