import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsTooltipComponent } from './reactions-tooltip.component';

describe('ReactionsTooltipComponent', () => {
  let component: ReactionsTooltipComponent;
  let fixture: ComponentFixture<ReactionsTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
