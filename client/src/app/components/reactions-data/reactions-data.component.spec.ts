import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsDataComponent } from './reactions-data.component';

describe('ReactionsDataComponent', () => {
  let component: ReactionsDataComponent;
  let fixture: ComponentFixture<ReactionsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
