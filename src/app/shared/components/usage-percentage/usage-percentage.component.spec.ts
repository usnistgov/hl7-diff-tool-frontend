import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagePercentageComponent } from './usage-percentage.component';

describe('UsagePercentageComponent', () => {
  let component: UsagePercentageComponent;
  let fixture: ComponentFixture<UsagePercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsagePercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsagePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
