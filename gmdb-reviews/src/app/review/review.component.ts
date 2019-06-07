import { Component, OnInit, Input } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'reviewForm',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: Review[];
  @Input()
  movieId: string;
  addReviewForm: FormGroup;
  email: string;
  success :boolean;
  
  constructor(private rs: ReviewsService, private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.reviews;
   }

  ngOnInit() {
    this.addReviewForm = this.fb.group({
      title:['' ,[Validators.required, Validators.maxLength(50)]],
      description:['' ,[Validators.required,Validators.maxLength(255)]]
    })
    this.showReviews();
    this.userService.getEmail().subscribe(email => this.email = email);
    this.success = false;
  }

  showReviews(){
    this.rs.getReviewsByMovieId(this.movieId).subscribe(reviews => this.reviews = reviews);
  }

  addReview() {
    let review = new Review();
    review.movieId = this.movieId;
    review.title = this.addReviewForm.controls.title.value;
    review.description = this.addReviewForm.controls.description.value;
    review.email = this.email;
    this.rs.addReview(review).subscribe();
    this.success = true;
  }
}
