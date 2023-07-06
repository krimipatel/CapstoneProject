import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';
import { postsMockData } from 'src/mocks';

import { ResidentialUserProfileComponent } from './residential-user-profile.component';

describe('ResidentialUserProfileComponent', () => {
  let component: ResidentialUserProfileComponent;
  let fixture: ComponentFixture<ResidentialUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialUserProfileComponent ],
      providers:[AppComponent],
      imports:[RouterTestingModule, HttpClientTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the posts', () => {
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(PostsService);
    spyOn(service, "getUserPost").and.callFake(()=>{
      return of(postsMockData)
    })
    app.getPosts();
    expect(app.posts).toEqual(postsMockData[0]);
  });
});
