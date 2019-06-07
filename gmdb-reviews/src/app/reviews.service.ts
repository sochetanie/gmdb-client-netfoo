import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from './review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviewsByMovieId(imdbId:string): Observable<Review[]>{
    return this.http.get<Review[]>(`http://localhost:8084/api/v1/reviews?movieId=${imdbId}`);
  }

  addReview(review: Review) {
    return this.http.post<Review>(`http://localhost:8084/api/v1/reviews`, review);
  }

}
