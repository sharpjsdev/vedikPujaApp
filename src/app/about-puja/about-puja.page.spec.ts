import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutPujaPage } from './about-puja.page';

describe('AboutPujaPage', () => {
  let component: AboutPujaPage;
  let fixture: ComponentFixture<AboutPujaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutPujaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
