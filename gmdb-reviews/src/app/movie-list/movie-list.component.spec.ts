import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MoviesService } from '../movies.service';
import { Movies } from '../movies';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceSpy: jasmine.SpyObj<MoviesService>;
    
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

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
      return of({"movies": this.stubValue});
    }

    getMovieByName(movieName:string){
      return of(this.stubValue)
    }

    getRandomMovies(){
      return of(this.stubValue);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MovieListComponent ],
      providers: [
        {provide: MoviesService,  useValue: new MockMovieService}, 
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

    movieServiceSpy = TestBed.get(MoviesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a movieList property and be Movie obj type', () => {
    component.movieList = [new Movies()];
    expect(component.movieList).toBeTruthy();
    expect(component.movieList[0] instanceof Movies).toEqual(true);
  });

  it('should have empty list of movies on the initial load', () => {
    let expectedLength =0;
    // let expectedMovies: Movies[];
    //movieServiceSpy.getAll().subscribe(movies => expectedMovies = movies.movies);
    //expect(component.movieList).toEqual(expectedMovies)
    expect(component.movieList.length).toEqual(expectedLength);
  });

  // it('should have list of searched movies', () => {
  //   let expectedMovies: Movies[];
  //   movieServiceSpy.getMovieByName('Avengers').subscribe(movies => expectedMovies = movies.movies);
  //   expect(component.movieList).toEqual(expectedMovies)
  // });
});
