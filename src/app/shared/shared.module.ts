import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { JobsComponent } from './components/jobs/jobs.component';
import { MatButtonModule } from '@angular/material/button';
import { AddSkillsComponent } from './components/add-skills/add-skills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    JobsComponent,
    AddSkillsComponent
    
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
  ],
  exports: [
    JobsComponent,
    AddSkillsComponent
  ]
})
export class SharedModule {}
