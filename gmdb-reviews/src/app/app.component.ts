import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from './movies.service';
import { Movies } from './movies';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Movies';
  movieList: Movies[];
  searchForm: FormGroup;
  randomMoviesList: Movies[];

  constructor(
    private router: Router, 
    private fb:FormBuilder, 
    private ms: MoviesService, 
    private userService:UserService) { }

  ngOnInit() {
    this.ms.getAll().subscribe(movies => this.movieList = movies.movies);

    this.searchForm = this.fb.group({
      query: ['', Validators.required]
    });
  }

  onEnter() { 
    this.router.navigate([`/searchResult/${this.searchForm.controls.query.value}`])
  }

  verifyAuth(){
    let verification;
    this.userService.isAuthenticated().subscribe(a=>verification=a);
    return verification;
  }

  logOut(){
    this.userService.logout();
  }
  
  getUserEmail(){
    let email;
    this.userService.getEmail().subscribe(a=>email=a);
    return email;
  }
  
}
