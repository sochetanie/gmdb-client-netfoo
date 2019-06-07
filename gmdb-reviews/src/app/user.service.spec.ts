import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { SimpleWebDriverClient } from 'blocking-proxy/built/lib/simple_webdriver_client';

let service;
describe('UserService', () => {
  beforeEach(() =>{ TestBed.configureTestingModule({})
  service = TestBed.get(UserService);
  
});

  it('should be created', () => {
    
    expect(service).toBeTruthy();
  });
  it('signup should store user', () => {
    let credentialStored;
   service.signUp('email','password')
    
    service.login('email','password').subscribe(a=>credentialStored=a);

    expect(credentialStored).toBeTruthy();
  });
  it('should verify if user is authenticated', () => {
    let verification;
  
    service.isAuthenticated().subscribe(a=>verification=a);
    expect(verification).toBeFalsy();
    service.signUp('email','password');
    service.isAuthenticated().subscribe(a=>verification=a);
    expect(verification).toBeTruthy();
  });
  it('should logout user', () => {
    let credentialStored;
      service.signUp('email','password')
      service.login('email','password').subscribe(a=>credentialStored=a);
      let verification;
  
      service.isAuthenticated().subscribe(a=>verification=a);
      expect(verification).toBeTruthy();
      service.logout();
      service.isAuthenticated().subscribe(a=>verification=a);
      expect(verification).toBeFalsy();
    });
  
});
