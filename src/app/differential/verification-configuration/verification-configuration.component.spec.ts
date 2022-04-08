import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationConfigurationComponent } from './verification-configuration.component';

describe('VerificationConfigurationComponent', () => {
  let component: VerificationConfigurationComponent;
  let fixture: ComponentFixture<VerificationConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
