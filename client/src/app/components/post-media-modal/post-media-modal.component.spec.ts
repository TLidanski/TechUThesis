import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMediaModalComponent } from './post-media-modal.component';

describe('PostMediaModalComponent', () => {
  let component: PostMediaModalComponent;
  let fixture: ComponentFixture<PostMediaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMediaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMediaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
