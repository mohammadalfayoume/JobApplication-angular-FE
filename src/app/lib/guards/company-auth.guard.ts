import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated && this.authService.currentRole == "Company") {
      return true; // Allow navigation
    } 
    else {
      // Redirect to the login page if not authenticated
      this.router.navigate(['/login']);
      return false; // Block navigation
    }
  }
}