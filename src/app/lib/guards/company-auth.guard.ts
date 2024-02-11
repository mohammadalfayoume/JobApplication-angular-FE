import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../../account/account.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyAuthGuard implements  CanLoad ,CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // guard$ = this.authService.userData$.pipe(
  //   map((data) => {
  //     console.log(data);
  //     if (data?.roles === 'Company'){
  //       return true;
  //     }
  //     this.router.navigate(['account/login']);
  //     return false;
  //   })
  // );
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.checkUserAuthentication() === true && this.authService.getUserRole() === 'Company') {
        console.log("User Can Load");
        return true;
      }
      else {
        console.log("User Cannot Load");
        this.router.navigate(['account/login']);
        return false;
        }
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.checkUserAuthentication() === true && this.authService.getUserRole() === 'Company') {
      console.log("User Activated");
      return true;
    }
    else {
      console.log("User Not Activated");
      this.router.navigate(['account/login']);
      return false;
    }
  }
}