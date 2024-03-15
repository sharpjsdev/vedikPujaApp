import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AboutTemplePage } from './about-temple.page';

describe('AboutTemplePage', () => {
  let component: AboutTemplePage;
  let fixture: ComponentFixture<AboutTemplePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutTemplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
