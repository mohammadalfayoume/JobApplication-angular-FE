import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { GeneralService } from '../../shared/general.service';


@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.css'
})
export class UpdateCompanyProfileComponent implements OnInit {
  countries: any[] = [];
  cities: any[] = [];
  selectedCountry: any;
  imgSrc: string = '';
  buttonDsiabled: boolean = false;
  constructor(private router: Router, private companyService: CompanyService, private generalServices: GeneralService) { 
    console.log("ffffffffffffff");
  }

  companyProfileForm = new FormGroup({
    companyName: new FormControl("", [Validators.required]),
    aboutUs: new FormControl("", [Validators.required]),
    countryId: new FormControl("", [Validators.required]),
    cityId: new FormControl("", [Validators.required]),
    profilePictureFile: new FormControl(null, [Validators.required])
  });
  ngOnInit() {
    this.fetchCountries();
  }
  submitForm(){
    
    if (this.companyProfileForm.valid) {
      this.buttonDsiabled = true;
      console.log(this.companyProfileForm.value);
      
      const formData : any = new FormData();

      // Append form values
      formData.append('companyName', this.companyProfileForm.get('companyName')?.value);
      formData.append('aboutUs', this.companyProfileForm.get('aboutUs')?.value);
      formData.append('countryId', this.companyProfileForm.get('countryId')?.value);
      formData.append('cityId', this.companyProfileForm.get('cityId')?.value);

      // Append file
      formData.append('profilePictureFile', this.companyProfileForm.get('profilePictureFile')?.value);

      this.companyService.updateCompany(formData).subscribe(
        response => {
          console.log("Updated successfully", response);
          this.buttonDsiabled = false;
        },
        error => {
          console.error("Error updating company:", error);
          this.buttonDsiabled = false;
        },
      );
    }
  }
  preview(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.imgSrc = URL.createObjectURL(event.target.files[0]);
      
    }
}
removeImage(): void {
  this.buttonDsiabled = true;
  this.imgSrc = ''; // Reset the image source
  // Additionally, you may want to clear the file input if needed
  const fileInput = document.getElementById('file') as HTMLInputElement;
  if (fileInput) {
      fileInput.value = '';
  }
}
  
  fetchCountries() {
    this.generalServices.getLookupData(3).subscribe(
      response => {
        this.countries = response.data;
      },
      (error) => {
        console.error("Error fetching countries:", error);
      }
    );
  }

  onCountrySelectionChange(event: any) {
    // Reset cities when a new country is selected
    this.cities = [];

    // Get the selected country
    
    this.selectedCountry = event.value;

    // Fetch cities for the selected country
    if (this.selectedCountry) {
      this.generalServices.getCountryCities(this.selectedCountry).subscribe(
        response => {
          this.cities = response.data;
        },
        (error) => {
          console.error("Error fetching cities:", error);
        }
      );
    }
  }
  // Handle file change event
  onFileChange(event: any) {
    if (event.target?.files && event.target.files[0]) {
      this.imgSrc = URL.createObjectURL(event.target.files[0]);
      
    }
    const file: any= (event.target as HTMLInputElement).files?.item(0);
    this.companyProfileForm.patchValue({
      profilePictureFile: file
    });
    this.buttonDsiabled = false;
  }
}
