import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userStorage: Object;
  authenticated: boolean;
  userEmail:string;

  constructor(private http: HttpClient) {
    this.userStorage = {};
    this.authenticated = false;
    this.userEmail = "";

  }

  signUp(name: string, userName: string, email: string, password: string):Observable<boolean> {
    let response: string;
    let body = {
      "name": name,
      "username": userName,
      "password": password,
      "email": email,
      "role": ["ROLE_USER"]
    }
    
    return this.http.post<any>("http://localhost:8080/auth/signup", body);
  }

  login(userName: string, password: string): Observable<boolean> {
    let body = {
      "username": userName,
      "password": password
    }

    return this.http.post<any>("http://localhost:8080/auth/signin", body)
  }

  setEmail(email: string){
    this.userEmail = email;
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.authenticated);
  }

  logout() {
    this.authenticated = false;
    this.userEmail="";
  }

  getEmail():Observable<string>{
    return of(this.userEmail);
  }

}
