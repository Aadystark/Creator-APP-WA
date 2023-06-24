import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  submitValidate: boolean = false;
  invalidData: boolean = false;

  constructor(private service: AuthServiceService, private route: Router) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.loginForm.valid) {
      this.service.getAuthToken(this.loginForm.value).subscribe((resp: any) => {
        if (resp) {
          this.service.loginAuthToken = resp;
          console.log(resp);
          this.route.navigate(['creator']);
        }
      }, (error: any) => {
        this.invalidData = true;
        this.submitValidate = false;
        setTimeout(() => {
          this.invalidData = false;
        }, 3000);
      });
    }
    else {
      this.submitValidate = true;
      this.invalidData = false;
      setTimeout(() => {
        this.submitValidate = false;
      }, 3000);
    }
    
  }
}
