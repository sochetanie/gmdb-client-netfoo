import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location} from '@angular/common';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formSignup: FormGroup;
  feedback: string = "";
  
  constructor(private fb: FormBuilder, 
    private lation:Location, 
    private userService:UserService, 
    private router: Router) { }

  ngOnInit() {
    this.formSignup = this.fb.group({
      name:['' ,[Validators.required]],
      userName:['' ,[Validators.required]],
      email:['' ,[Validators.required,Validators.email]],
      password:['' ,[Validators.required,Validators.minLength(6)]],
      confirmPassword:['' ,[Validators.required,Validators.minLength(6)]]
    })
  }

  signup(){
    if(this.formSignup.valid){
      let {name, userName, email, password, confirmPassword} = this.formSignup.value;
      if (password !== confirmPassword){return;} 

      this.userService.userEmail = email;
      this.userService.authenticated = true;
      
      this.userService.signUp(name, userName, email,password).subscribe(); 
    }
    this.router.navigate(['/']);
  }
  
}
