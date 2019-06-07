import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import  {Search as movieData}  from '../data/movies.json';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Movies } from './movies';

describe('MoviesService', () => {
  let service: MoviesService;
  let fakeHttp: HttpClient;
  let httpClientSpy: { get: jasmine.Spy };

  let stubValue = [{
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
  }]

  class fakeHttpClient{
    stubValue: Movies[];

    constructor(){
      this.stubValue = stubValue;
    }

    get(){
      return of({"movies": this.stubValue});
    }
  }

  beforeEach(() =>{
     TestBed.configureTestingModule({
       imports: [HttpClientModule],
       providers: [{provide: HttpClient, useValue: fakeHttpClient}]
     })
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    //service = TestBed.get(MoviesService);
    service = new MoviesService(<any> httpClientSpy);
    fakeHttp = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return movie list ', () => {
    // let movieName = movieData[0].Title;
    let expected = stubValue;
    httpClientSpy.get.and.returnValue(of({"movies": stubValue}));
    let movieList: Movies[];

    service.getAll().subscribe(a => movieList = a.movies);

    expect(movieList).toEqual(expected);
  });


  it('should return list of movies by name ', () => {
    httpClientSpy.get.and.returnValue(of({"movies": stubValue}));
    let movieList: Movies[];
    let expected = stubValue;

    service.getMovieByName('The').subscribe(a => movieList = a.movies);

    // expect(movieList).toEqual(expected);
    expect(movieList.length).toEqual(1);
  });

  it('should return movieDetails by id ', () => {
    let expected = stubValue[0];
    httpClientSpy.get.and.returnValue(of({"movie": stubValue[0]}));

    let actual;
    service.getMovieDetailById('tt0848228').subscribe(a => actual = a.movie);
    
    expect(actual).toEqual(expected);
  });

});
