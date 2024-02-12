import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SharedService } from '../../shared.service';
import { SkillDto } from '../../../lib/interface/skillDto';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrl: './add-skills.component.css'
})
export class AddSkillsComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl('');
  filteredSkills: Observable<string[]> | undefined;
  skills: SkillDto[] = [];
  allSkills: string[] = [];

  @Output() onSkillsAdded = new EventEmitter<any[]>();

  announcer = inject(LiveAnnouncer);

  constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.sharedService.getSkills().subscribe(
      res => {
        res.map((skill: { name: any; }) => {
          this.allSkills.push(skill.name);
        })
      }
    )
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
      );
  }

  public updateSkills(skills: SkillDto[]): void {
    this.onSkillsAdded.emit(skills);
  }

  add(event: MatChipInputEvent): void {
    
    const value = (event.value || '').trim();
    
    // Add our skill
    if (value) {
      this.skills.push({name: value});
      this.updateSkills(this.skills);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(skill: SkillDto): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
      this.updateSkills(this.skills);

      this.announcer.announce(`Removed ${skill}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push({name: event.option.viewValue});
    this.updateSkills(this.skills);
    var inputSkill = document.getElementById("inputSkill") as HTMLInputElement;
    inputSkill.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }
}
