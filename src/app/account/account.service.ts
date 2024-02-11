import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UserDto } from '../lib/interface/userDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject<UserDto | null>(null);
  userData$ = this.userSource.asObservable();

  private apiUrl = environment.apiUrl;
  private tokenKey = 'token';
  private userIdKey = 'userId';
  private rolesKey = 'roles';

  constructor(private http: HttpClient, private router: Router) { }
  loadCurrentUser() {
    return this.http.get<any>(`${this.apiUrl}/account/getUserData`).pipe(
      map(value => {
        const user = value.data;
        user.token = localStorage.getItem('token');
        console.log(this.userData$);
        this.userSource.next(user);
        console.log(this.userData$);
      })
    )
  }
  checkUserAuthentication() : boolean{
    const token = localStorage.getItem('token');
    return !!token;
  }
  getUserRole() : string | null {
    const role = localStorage.getItem('roles');
    return role;
  }
  registerUser(userForm: any) {
    return this.http.post<any>(`${this.apiUrl}/account/register`, userForm).pipe(
      map(response => {
        const user = response.data;
        this.storeTokenAndUserData(user.token, user.id, user.roles);
        this.userSource.next(user);
        // Redirect based on user role
        if (user.roles === 'Company') {
          this.router.navigate(['/company']);
        } else if (user.roles === 'JobSeeker') {
          this.router.navigate(['/jobseeker']);
        } 
      })
    )
  }

  loginUser(userForm: any) {
    return this.http.post<any>(`${this.apiUrl}/account/login`, userForm).pipe(
      map(response => {
        const user = response.data;
        this.storeTokenAndUserData(user.token, user.id, user.roles);
        this.userSource.next(user);
        // Redirect based on user role
        if (user.roles === 'Company') {
          this.router.navigate(['/company']);
        } else if (user.roles === 'JobSeeker') {
          this.router.navigate(['/jobseeker']);
        } 
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.userSource.next(null);
    this.router.navigateByUrl('/account/login');
  }
  
  storeTokenAndUserData(token: string, userId: number, roles: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userIdKey, userId.toString());
    localStorage.setItem(this.rolesKey, roles);
  }
}
