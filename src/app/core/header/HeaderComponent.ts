import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../account/account.service';
import { Observable } from 'rxjs';
import { FileService } from '../../shared/file.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  
  imgSrc: string = '';

  constructor(public router: Router, public authService: AuthService, public fileService: FileService) { }

  onClickSignOut(): void {
    this.authService.logout();
  }
  navigation(location: string) {
    this.router.navigate([location]);
  }
}
