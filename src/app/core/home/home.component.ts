import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {


  private readonly _destroy$ = new Subject();


  ngOnDestroy(): void {
      this._destroy$.complete();
      this._destroy$.unsubscribe();
  }
}

