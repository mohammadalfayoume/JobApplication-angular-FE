import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LookupDto } from '../../lib/interface/LookupDto';
import { SharedService } from '../../shared/shared.service';
import { COUNTRY_ENUM, JOB_TYPE_ENUM } from '../../lib/constants';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { SkillDto } from '../../lib/interface/skillDto';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent implements OnInit {
  selectedJobType: number = 1;
  selectedCountryId: number = 1;
  
  skills: SkillDto[] = []
  workplaceTypes: LookupDto[] = [];

  countries: LookupDto[] = [];
  cities: LookupDto[] = [];

  constructor(private _formBuilder: FormBuilder, private _sharedService: SharedService, private _ngZone: NgZone, private _companyService: CompanyService) {}
  ngOnInit(): void {
    this._sharedService.getLookupData(JOB_TYPE_ENUM).subscribe(res => this.workplaceTypes = res.data);
    this._sharedService.getLookupData(COUNTRY_ENUM).subscribe(res => this.countries = res.data);
  }
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
  }
  finalFormGroup: object = {};
  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    jobTypeLookupId: ['', Validators.required],
    yearsOfExperience: ['', Validators.required],
    countryId: ['', Validators.required],
    cityId: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    description: ['', Validators.required],

  });
  isLinear = false;
  public updateSelectedSkills(skills: SkillDto[]):void {
    this.skills = skills;
  }
  submitJobForm() {
    this.finalFormGroup= {...this.firstFormGroup.value, ...this.secondFormGroup.value, 'skills': this.skills};
    console.log(this.finalFormGroup);
    this._companyService.createOrUpdateJob(this.finalFormGroup).subscribe(
      response => {
      console.log(response);
    },
    error => {
      console.error("Error in create new job: ", error)
    }
    )
  }
  getCountryCities(event: any) {
    // Reset cities when a new country is selected
    this.cities = [];
    // Get the selected country
    this.selectedCountryId = event.value;
    // Fetch cities for the selected country
    if (this.selectedCountryId) {
      this._sharedService.getCountryCities(this.selectedCountryId).subscribe(
        response => {
          this.cities = response.data;
        },
        (error) => {
          console.error("Error fetching cities:", error);
        }
      );
    }
  }
}
