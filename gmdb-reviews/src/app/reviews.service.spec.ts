import { TestBed, async } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './user.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  class fakeHttpClient{
    get(){
      return of(
        [
          {
            id: 6,
            movieId: "tt0848228",
            email: "user@hello",
            description: "Very Good :)",
            title: "Waste your time!"
        },
        {
          id: 7,
          movieId: "tt0848228",
          email: "dfbdbfd@hello",
          description: "Awesome",
          title: "Just go!"
        }
      ]
      )
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        {provide: HttpClient,  useValue: new fakeHttpClient}, 
        ReviewsService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>{
    service = TestBed.get(ReviewsService);
  });

  it('should be created', () => {
    const service: ReviewsService = TestBed.get(ReviewsService);
    expect(service).toBeTruthy();
  });

  it('should return list of review for the specific movie', () => {
    let reviewList;
    service.getReviewsByMovieId("tt0848228").subscribe(a => reviewList = a);
    let expected = [
      {
        id: 6,
        movieId: "tt0848228",
        email: "user@hello",
        description: "Very Good :)",
        title: "Waste your time!"
      },
      {
      id: 7,
      movieId: "tt0848228",
      email: "dfbdbfd@hello",
      description: "Awesome",
      title: "Just go!"
      } 
    ]
    expect(reviewList).toEqual(expected);
  });


});
