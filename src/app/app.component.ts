import { Component, OnInit } from '@angular/core';
import { AuthService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'JobApplication-FE';
  ngOnInit(): void {
    // this.loadCurrentUser();
  }
  constructor(private authService: AuthService) {
    
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) this.authService.loadCurrentUser().subscribe();
  }
}
