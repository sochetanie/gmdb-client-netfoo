import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movies } from '../movies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movieList',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: Movies[];
  query = '';
  wasClicked = false;
  randomMoviesList: Movies[];

  constructor(private ms: MoviesService, private actRouter: ActivatedRoute) { 
    this.movieList = [];
    this.randomMoviesList = [];
  }

  onClick() {
    this.wasClicked= !this.wasClicked;
  }

  ngOnInit() {
    this.update();
  }

  update(){
    if(this.actRouter.params){
      this.actRouter.params.subscribe(data => {
        try {
          this.query = data.query;
          if(!this.query){
            this.ms.getAll().subscribe(movies => {
              this.movieList = movies.movies;
              while (this.randomMoviesList.length != 95) {
                let randomIndex = Math.floor(Math.random() * (+this.movieList.length - +0) + +0);
                if (!this.randomMoviesList.includes(this.movieList[randomIndex])) {
                  this.randomMoviesList.push(this.movieList[randomIndex]);
                }
              }
              this.movieList = this.randomMoviesList;
            });
          }
          else{
            this.ms.getMovieByName(this.query).subscribe(movies => this.movieList = movies.movies);
          }
        } catch (error) {}
      });
    }
  }

}
