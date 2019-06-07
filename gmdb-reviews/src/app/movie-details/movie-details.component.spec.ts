import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesService } from '../movies.service';
import { MovieDetailsComponent } from './movie-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import { Observable,of } from 'rxjs';
import { Movies } from '../movies';
import { ReviewsService } from '../reviews.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from '../review/review.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let service: MockMovieService;
  let app;

  class MockMovieService {
    stubValue: Movies[];

    constructor(){
      this.stubValue = [{
        "Title": "The Avengers",
        "Year": "2012",
        "Rated": "PG-13",
        "Released": "04 May 2012",
        "Runtime": "143 min",
        "Genre": "Action, Adventure, Sci-Fi",
        "Director": "Joss Whedon",
        "Writer": "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
        "Actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
        "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        "Language": "English, Russian, Hindi",
        "Country": "USA",
        "Awards": "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        "Ratings": [{
          "Source": "Internet Movie Database",
          "Value": "8.1/10"
        }, {
          "Source": "Rotten Tomatoes",
          "Value": "92%"
        }, {
          "Source": "Metacritic",
          "Value": "69/100"
        }],
        "Metascore": "69",
        "imdbRating": "8.1",
        "imdbVotes": "1,165,317",
        "imdbID": "tt0848228",
        "Type": "movie",
        "DVD": "25 Sep 2012",
        "BoxOffice": "$623,279,547",
        "Production": "Walt Disney Pictures",
        "Website": "http://marvel.com/avengers_movie",
        "Response": "True"
      }];
    }
    
    getAll(){
      return of(this.stubValue)
    }

    getMovieByName(movieName:string){
      return of(this.stubValue)
    }

    getMovieDetailById(id: string){
      return of(this.stubValue[1])
    }
  }

  let params = of({id:'tt0848228'});


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'projects/:projectId', component: MovieDetailsComponent }]), 
      HttpClientModule, ReactiveFormsModule, FormsModule],
      declarations: [ MovieDetailsComponent, ReviewComponent ],
      providers:[
        {provide: ActivatedRoute, useValue: params},
        {provide: MoviesService,  useValue: new MockMovieService},
        ReviewsService,
        HttpClient
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.nativeElement;
    fixture.detectChanges();
    service = TestBed.get(MoviesService);
    let movieData;
    fixture.detectChanges();
    service.getMovieDetailById('tt0848228').subscribe(a => movieData = a);
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  xit('should display details', () => {
    let movieGenre=app.querySelectorAll('li');
    expect(movieGenre).toContain('Action');
  });
  
});
