import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { Review } from '../review';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ReviewsService } from '../reviews.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let service: ReviewsService;
  let us: UserService;

  class MockReviewService {
    stubValue: Review[];

    constructor(){
      this.stubValue = [];
    }

    addReview(review: Review) {
      component.reviews.push(review);
    }

    getReviewsByMovieId(movieId : string){
      return of(this.stubValue);
    }
  }

  class MockUserService{
    stubValue = "hello@hello";
    
    getEmail(){
      return of(this.stubValue);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ ReviewComponent ],
      providers: [
        {provide: ReviewsService, useValue: new MockReviewService}, 
        FormBuilder, HttpClient, 
        {provide: UserService, useValue: new MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(ReviewsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ReviewList property and be Review obj type', () => {
    component.reviews = [new Review()];
    expect(component.reviews).toBeTruthy();
    expect(component.reviews[0] instanceof Review).toEqual(true);
  });

  it('should have list of reviews for the current movie', () => {
    let expectedReviews: Review[];
    service.getReviewsByMovieId('tt0848228').subscribe(review => expectedReviews = review);
    component.showReviews();
    expect(component.reviews).toEqual(expectedReviews);
  });

  it('should have the user email ready before adding reviews', () => {
    let expectedEmail = 'hello@hello';

    expect(component.email).toEqual(expectedEmail);
  })

  // it('should be able to view review after adding review', () => {
  //   let expectedLength = 1;

  //   console.log(component.reviews);

  //   service.addReview({
  //     id:"1",
  //     userId:"1",
  //     movieId:"tt0848228",
  //     title:"Good movie",
  //     description:"terrible movie"
  //   });
  //   component.showReviews();

  //   expect(component.reviews.length).toEqual(expectedLength);
  // });
});
