import { Component, OnInit, NgModule } from '@angular/core';
import { Movies } from '../movies';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Location } from '@angular/common'; 
import { Review } from '../review';
import { ReviewsService } from '../reviews.service';



@Component({
  selector: 'movieDetails',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movies;
  id: string; //imdb id
  showReviews:boolean = false;
  showAddReviewForm:boolean = false;
  reviews: Review[];

  constructor(
    private activateRouter: ActivatedRoute, 
    private movieService: MoviesService,
    private location:Location, 
    private rs: ReviewsService) { }

  ngOnInit() {
    if(this.activateRouter.params){
      this.activateRouter.params.subscribe(({ id }) => this.id = id);
      this.movieService.getMovieDetailById(this.id).subscribe(data => this.movie = data.movie);
    }
  }

  goBack() { this.location.back(); }

  toggleShowReviews() {
    this.showReviews = !this.showReviews;
    this.showAddReviewForm = false;
  }

  toggleAddReview() {
    this.showAddReviewForm = !this.showAddReviewForm;
    this.showReviews = false;
  }

  getReviews() {
    this.rs.getReviewsByMovieId(this.id).subscribe(reviews => this.reviews = reviews);
  }
}
