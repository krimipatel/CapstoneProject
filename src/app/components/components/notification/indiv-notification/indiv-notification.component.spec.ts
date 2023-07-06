import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivNotificationComponent } from './indiv-notification.component';

describe('IndivNotificationComponent', () => {
  let component: IndivNotificationComponent;
  let fixture: ComponentFixture<IndivNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndivNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('banner works!');
  });

});
