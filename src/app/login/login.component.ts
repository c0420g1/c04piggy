import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {TokenStorageService} from '../service/token-storage.service';
import {Router} from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  provider: any;
  user: any;
  formLogin: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;
  roles: string;
  constructor(private fb: FormBuilder, private auth: AuthService, private tokenStorage: TokenStorageService, private router: Router ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [''],
      password: ['']
    });
  }
  login(){
    console.log(this.formLogin.value);
    this.auth.attemptAuth(this.formLogin.value).subscribe(data => {
          if (data == null){
            this.errorMessage = 'Account or Password is wrong ';
            this.isLoginFailed = true;
          }else { console.log(data);
                  this.tokenStorage.saveToken(data.accessToken);
                  this.tokenStorage.saveUsername(data.username);
                  this.tokenStorage.saveAuthorities(data.authorities);
                  this.isLoginFailed = false;
                  this.isLoggedIn = true;
                  this.roles = this.tokenStorage.getAuthorities();
                  this.router.navigateByUrl('/stock');
                  // this.reloadPage();
          }
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        });
  }

  reloadPage() {
    window.location.reload();
  }
}

