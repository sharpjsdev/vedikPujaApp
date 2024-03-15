import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayResponsePage } from './pay-response.page';

describe('PayResponsePage', () => {
  let component: PayResponsePage;
  let fixture: ComponentFixture<PayResponsePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PayResponsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
