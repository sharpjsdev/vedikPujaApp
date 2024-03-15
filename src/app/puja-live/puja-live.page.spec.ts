import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PujaLivePage } from './puja-live.page';

describe('PujaLivePage', () => {
  let component: PujaLivePage;
  let fixture: ComponentFixture<PujaLivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PujaLivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
