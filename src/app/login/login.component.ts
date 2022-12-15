import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { SharedService } from '../shared/shared.service';
import { AuthGuard } from '../shared/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  title = "FastMart";
  error!: boolean;
  showPass = false;
  credentials!: Array<any>;
  
  
  constructor(private APIService: ApiService, private router: Router, 
    private dialog: MatDialog, private SharedService: SharedService, 
    private auth: AuthGuard) {}

  ngOnInit(): void {
      //subscribe to the APIservice to get username-password values
      this.APIService.getUsers()
      .subscribe(data => this.credentials = data);
      localStorage.setItem('isLoggedIn', 'not');
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  //check login credentials
  async login() {
    this.error = false;
    for(let i = 0; i < this.credentials.length; ++i) {
      if(this.credentials[i]["username"] === this.loginForm.value.username 
      && this.credentials[i]["password"] === this.loginForm.value.password) {
        this.SharedService.username = this.loginForm.value.username;
        this.error = true;
        localStorage.setItem('isLoggedIn', 'done');
        this.router.navigate(['/shopping']);
      }
    }
    if(this.error == false) {
      this.dialog.open(ErrorComponent, {width: '30%'});
    } 
  }

  //show password
  showPassword() {
    this.showPass = !this.showPass;
  }
 }
