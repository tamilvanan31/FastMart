import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private shared: SharedService, private http: HttpClient) { }
  data: any = [];
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    this.http.get('assets/data.json')
      .subscribe(response => {
        this.data = response;
      });

    //mapping the username so that an authorized user only can access the shopping page
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i]["username"] == this.shared.username) {
        return true;
      }
    }
    return false;
  }

}
