import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/HeaderComponent';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    LayoutComponent,
  ]
})
export class CoreModule { }
