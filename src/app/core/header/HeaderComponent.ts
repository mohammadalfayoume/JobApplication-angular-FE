import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../account/account.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  imgSrc: string = '';
  isAuthenticated: boolean = false;
  role: any;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.userData$.subscribe((data) => {
      this.isAuthenticated = data?.token ? true : false;
      this.role = data?.roles;
    });
  }
  onClickSignOut(): void {
    this.authService.logout();
  }
}
