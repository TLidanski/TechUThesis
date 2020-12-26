import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileMediaComponent } from './user-profile-media.component';

describe('UserProfileMediaComponent', () => {
  let component: UserProfileMediaComponent;
  let fixture: ComponentFixture<UserProfileMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
