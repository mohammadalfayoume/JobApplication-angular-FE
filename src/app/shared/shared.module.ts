import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './components/jobs/jobs.component';
import { PostJobComponent } from '../company/post-job/post-job.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    JobsComponent
    
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    JobsComponent
  ]
})
export class SharedModule { }
