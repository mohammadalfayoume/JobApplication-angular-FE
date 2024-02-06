import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UserDto } from '../lib/interface/userDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A BehaviorSubject that holds the authentication status (true if authenticated, false otherwise)
  private isAuthenticatedSource = new BehaviorSubject<boolean>(this.checkToken());
  isAuthenticated$ = this.isAuthenticatedSource.asObservable();

  private userSource = new BehaviorSubject<UserDto | null>(null);
  userData$ = this.userSource.asObservable();

  currentRole : any = localStorage.getItem("roles");
  
  private apiUrl = environment.apiUrl;
  private tokenKey = 'token';
  private userIdKey = 'userId';
  private rolesKey = 'roles';

  constructor(private http: HttpClient, private router: Router) { }

  // Method to check if a token is present in local storage
  private checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token is present, false otherwise
  }
  // Method to update isAuthenticated$ after storing token and user data
  private updateAuthenticationStatus(): void {
    this.isAuthenticatedSource.next(this.checkToken());
  }
  registerUser(userForm: any) {
    return this.http.post<any>(`${this.apiUrl}/account/register`, userForm).pipe(
      map(response => {
        const user = response.data;
        this.storeTokenAndUserData(user.token, user.id, user.roles);
        this.updateAuthenticationStatus();
        this.userSource.next(user);
      })
    )
  }

  loginUser(userForm: any) {
    return this.http.post<any>(`${this.apiUrl}/account/login`, userForm).pipe(
      map(response => {
        const user = response.data;
        console.log(user);
        this.storeTokenAndUserData(user.token, user.id, user.roles);
        this.updateAuthenticationStatus();
        this.userSource.next(user);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.updateAuthenticationStatus();
    this.router.navigateByUrl('/');
  }
  
  storeTokenAndUserData(token: string, userId: number, roles: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userIdKey, userId.toString());
    localStorage.setItem(this.rolesKey, roles);
    this.updateAuthenticationStatus();
  }
}
