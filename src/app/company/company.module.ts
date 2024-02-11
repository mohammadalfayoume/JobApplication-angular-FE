import { NgModule } from '@angular/core';

import { UpdateCompanyProfileComponent } from './update-company/update-company.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostJobComponent } from './post-job/post-job.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';



@NgModule({
  declarations: [
    UpdateCompanyProfileComponent,
    CompanyProfileComponent,
    PostJobComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    MatDialogTitle,
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatTabsModule,
    MatStepperModule
  ],

})
export class CompanyModule { }
