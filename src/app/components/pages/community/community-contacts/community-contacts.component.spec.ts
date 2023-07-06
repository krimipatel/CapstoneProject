import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityContactsComponent } from './community-contacts.component';

describe('CommunityContactsComponent', () => {
  let component: CommunityContactsComponent;
  let fixture: ComponentFixture<CommunityContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
