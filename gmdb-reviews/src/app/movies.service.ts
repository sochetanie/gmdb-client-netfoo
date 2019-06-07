import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Movies } from './movies.js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movieStorage:Movies[];
  
  constructor(private http: HttpClient) { }

  getAll():Observable<Movies[]>{
    return this.http.get<Movies[]>('http://localhost:8083/movies/api/search/%20');
  }

  getMovieByName(movieName:string):Observable<Movies[]>{
    return this.http.get<Movies[]>('http://localhost:8083/movies/api/search/'+movieName);
  }

  getMovieDetailById(imdbId:string):Observable<Movies>{
    return this.http.get<Movies>('http://localhost:8083/movies/api/detail/' + imdbId);
  }
  
}
