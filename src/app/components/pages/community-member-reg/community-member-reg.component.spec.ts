import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMemberRegComponent } from './community-member-reg.component';

describe('CommunityMemberRegComponent', () => {
  let component: CommunityMemberRegComponent;
  let fixture: ComponentFixture<CommunityMemberRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityMemberRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMemberRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});