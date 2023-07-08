import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  data: any = [];
  constructor(private http: HttpClient, private router: Router, private shared: SharedService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //Make sure user can access shopping when the user is logged-in
    this.http.get('assets/data.json')
      .subscribe(response => {
        this.data = response;
      });
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i]["username"] == this.shared.username) {
        return false;
      }
    }
    return true;
  }

}
